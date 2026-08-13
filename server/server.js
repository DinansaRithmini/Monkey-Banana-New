//server/server.js

require("dotenv").config()
const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const mongoose = require("mongoose")
const cors = require("cors")
const GameRoom = require("./models/DatabaseModel")
const Winner = require("./models/Winner")
const PlayerProfile = require("./models/Player")
const ContinuousGame = require("./models/ContinuousGame")
const { generateSignedRequest } = require('gameon-sdk-auth');
//const { generateSignedPayload } = require("./signature");
const axios = require("axios");
const fs = require('fs');
const path = require("path");
const { verifyFrontendSignature } =  require("./middleware/auth");
const {
  resolveSessionToken,
  exchangeLaunchTicketWithPlatform,
  InvalidSessionTokenError,
} = require("./utils/session");

const privateKeyPath = path.join(__dirname, "./private_key.pem");
let privateKey = null;
if (fs.existsSync(privateKeyPath)) {
  privateKey = fs.readFileSync(privateKeyPath, "utf8");
} else {
  console.warn("⚠️  WARNING: private_key.pem not found. The /api/coinRelease endpoint will be unavailable.");
}

const GameManager = require("./gameManager")


const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

const DEVELOPER_ID = process.env.DEVELOPER_ID;

// Middleware
app.use(cors())
app.use(express.json())

const TOKEN_URL = `${process.env.AUTH_BASE_URL}/realms/safa/protocol/openid-connect/token`;
const CLIENT_ID = process.env.AUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.AUTH_CLIENT_SECRET;
const AIRDROP_URL = `${process.env.AIRDROP_BASE_URL}/api/v1/external/user-reward-profile/raffle-draw`;
const FRONTEND_URL = process.env.FRONTEND_URL;
const GAMEON_BACKEND_URL = process.env.GAMEON_BACKEND_URL;

async function getClientCredentialsToken() {
  const form = new URLSearchParams();
  form.set("grant_type", "client_credentials");
  form.set("client_id", CLIENT_ID);
  form.set("client_secret", CLIENT_SECRET);

  const resp = await axios.post(TOKEN_URL, form.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    timeout: 10000,
  });

  const token = resp.data?.access_token;
  if (!token) {
    throw new Error("No access_token in Keycloak response");
  }
  return token;
}
//|| "mongodb://dam:dam%40GameON20@144.126.243.236:27017/damdb"
//mongodb+srv://hesarayasith9:games@cluster0.jfyqozv.mongodb.net/
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
  })
  .catch((err) => {
    process.exit(1)
  })

// Handle MongoDB connection events
mongoose.connection.on("connected", () => {
})

mongoose.connection.on("error", (err) => {
})

mongoose.connection.on("disconnected", () => {
})

// Initialize game manager
const gameManager = new GameManager(io)

// Shared function to update player profile and propagate changes
async function upsertPlayerProfile({ uuid, name, profileImage, email }) {
  if (!uuid) {
    throw new Error("UUID is required")
  }

  let player = await PlayerProfile.findOne({ uuid })

  if (player) {
    // Update existing player
    const oldName = player.name
    const oldProfileImage = player.profileImage
    
    player.name = name || player.name
    player.profileImage = profileImage || player.profileImage
    player.email = email || player.email
    await player.save()

    // Update player in active continuous games if name or profileImage changed
    if ((name && name !== oldName) || (profileImage && profileImage !== oldProfileImage)) {
      await ContinuousGame.updateMany(
        { 
          "players.id": uuid,
          roundStatus: "active"
        },
        {
          $set: {
            "players.$.name": player.name,
            "players.$.profileImage": player.profileImage
          }
        }
      )

      // Also update in GameRoom if exists
      await GameRoom.updateMany(
        { "players.uuid": uuid },
        {
          $set: {
            "players.$.name": player.name,
            "players.$.profileImage": player.profileImage
          }
        }
      )
    }
  } else {
    // Create new player
    player = new PlayerProfile({
      uuid,
      name: name || `Player_${uuid.substring(0, 8)}`,
      profileImage: profileImage || "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png",
      email,
    })
    await player.save()
  }

  return player
}

// Socket.io connection handling
// server.js (socket.io part)
io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  socket.on("joinGame", async (gameId) => {
    socket.join(gameId)
    console.log(`Socket ${socket.id} joined game: ${gameId}`)

    // If joining continuous game, send current state immediately
    if (gameId === "continuous-betting-game") {
      try {
        const game = await ContinuousGame.findOne({ 
          gameId: "continuous-betting-game", 
          roundStatus: "active" 
        }).sort({ roundNumber: -1 })
        
        if (game) {
          console.log(`Sending game state to ${socket.id}: Round ${game.roundNumber}, Phase: ${game.phase}, ${game.players.length} players`)
          // Send the game state as-is with all current properties
          const gameState = {
            id: game.gameId,
            gameId: game.gameId,
            players: game.players,
            phase: game.phase,
            timeLeft: game.timeLeft,
            winner: game.winner,
            rotation: game.rotation,
            totalPot: game.totalPot,
            roundNumber: game.roundNumber,
            bettingStartTime: game.bettingStartTime,
            roundStatus: game.roundStatus,
            isActive: game.isActive,
            createdAt: game.createdAt
          }
          socket.emit("gameUpdated", gameState)
        } else {
          console.log(`No active game found for ${socket.id}, sending empty state`)
          // Send a default empty state if no game exists
          socket.emit("gameUpdated", {
            id: "continuous-betting-game",
            gameId: "continuous-betting-game",
            players: [],
            phase: "betting",
            timeLeft: 60,
            winner: null,
            rotation: 0,
            totalPot: 0,
            roundNumber: 0,
            bettingStartTime: new Date(),
            roundStatus: "active",
            isActive: true
          })
        }
      } catch (error) {
        console.error("Error fetching continuous game on join:", error)
      }
    } else {
      const game = await gameManager.getGame(gameId)
      if (game) {
        socket.emit("gameUpdated", game)
      }
    }
  })

  socket.on("leaveGame", (gameId) => {
    socket.leave(gameId)
    console.log(`Socket ${socket.id} left game: ${gameId}`)
  })

  socket.on("addPlayer", async (data) => {
    const { gameId, playerName, betAmount } = data
    const result = await gameManager.addPlayer(gameId, playerName, betAmount)
    socket.emit("playerAdded", result)
  })

  socket.on("addBots", async (data) => {
    const { gameId, bots } = data
    const result = await gameManager.addBots(gameId, bots)
    socket.emit("botsAdded", result)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

// REST API endpoints
app.post("/api/games", async (req, res) => {
  try {
    const game = await gameManager.createGame()
    res.json({ success: true, game })
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create game" })
  }
})

app.get("/api/games/:gameId", async (req, res) => {
  try {
    const game = await gameManager.getGame(req.params.gameId)
    if (!game) {
      return res.status(404).json({ success: false, error: "Game not found" })
    }
    res.json({ success: true, game })
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to get game" })
  }
})

app.post("/api/games/:gameId/reset", async (req, res) => {
  try {
    const newGame = await gameManager.resetGame(req.params.gameId)
    res.json({ success: true, game: newGame })
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to reset game" })
  }
})

// Winners API endpoints
app.post("/api/winners", async (req, res) => {
  try {
    const winnerData = req.body

    const winner = new Winner(winnerData)
    await winner.save()


    res.json({ success: true, winner })
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to save winner" })
  }
})

app.get("/api/winners", async (req, res) => {
  try {
    const { limit = 10, gameSessionUuid = "continuous-game" } = req.query

    const winners = await Winner.find({ gameSessionUuid }).sort({ winDate: -1 }).limit(Number.parseInt(limit))

    res.json({ success: true, winners })
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch winners" })
  }
})

app.get("/api/winners/recent/:count", async (req, res) => {
  try {
    const count = Number.parseInt(req.params.count) || 5
    const gameSessionUuid = req.query.gameSessionUuid || "continuous-game"

    const winners = await Winner.find({ gameSessionUuid }).sort({ winDate: -1 }).limit(count)

    res.json({ success: true, winners })
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch recent winners" })
  }
})

app.get("/api/winners/top", async (req, res) => {
  try {
    const gameSessionUuid = req.query.gameSessionUuid || "continuous-game"

    const winner = await Winner.findOne({ gameSessionUuid })
      .sort({ wonAmount: -1, winDate: -1 })
      .lean()

    if (!winner) {
      return res.json({ success: true, winner: null })
    }

    res.json({ success: true, winner })
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch top winner" })
  }
})

// Continuous Game Management endpoints
app.post("/api/continuous-game/broadcast", async (req, res) => {
  try {
    const { gameState } = req.body
    
    // Broadcast to all clients in the continuous game room
    io.to("continuous-betting-game").emit("gameUpdated", gameState)
    
    res.json({ success: true })
  } catch (error) {
    console.error("Error broadcasting game update:", error)
    res.status(500).json({ success: false, error: "Failed to broadcast update" })
  }
})

app.post("/api/continuous-game/reset-collection", async (req, res) => {
  try {
    // Delete all documents in the collection
    await ContinuousGame.deleteMany({})
    
    res.json({ success: true, message: "Collection reset successfully - all documents deleted" })
  } catch (error) {
    console.error("Error resetting collection:", error)
    res.status(500).json({ success: false, error: "Failed to reset collection" })
  }
})

app.get("/api/continuous-game/debug", async (req, res) => {
  try {
    const allGames = await ContinuousGame.find({ gameId: "continuous-betting-game" }).sort({ roundNumber: 1 })
    const activeGames = await ContinuousGame.find({ gameId: "continuous-betting-game", roundStatus: "active" })
    
    res.json({ 
      success: true, 
      totalGames: allGames.length,
      activeGames: activeGames.length,
      allGames: allGames.map(g => ({
        roundNumber: g.roundNumber,
        roundStatus: g.roundStatus,
        phase: g.phase,
        playersCount: g.players.length,
        createdAt: g.createdAt
      }))
    })
  } catch (error) {
    console.error("Error fetching debug info:", error)
    res.status(500).json({ success: false, error: "Failed to fetch debug info" })
  }
})

app.post("/api/continuous-game/test-create", async (req, res) => {
  try {
    const testGame = {
      gameId: "continuous-betting-game",
      players: [],
      phase: "betting",
      timeLeft: 60,
      winner: null,
      rotation: 0,
      totalPot: 0,
      roundNumber: 1,
      bettingStartTime: new Date(),
      roundStatus: "active",
      isActive: true,
      addedBots: [],
      botAdditionTimes: {},
      winnerSaved: false,
      isSpinning: false
    }
    
    const game = new ContinuousGame(testGame)
    await game.save()
    
    res.json({ success: true, game, message: "Test game created successfully" })
  } catch (error) {
    console.error("Error creating test game:", error)
    res.json({ success: false, error: error.message, code: error.code })
  }
})

app.get("/api/continuous-game/state", async (req, res) => {
  try {
    // First try to get an active game
    let game = await ContinuousGame.findOne({ 
      gameId: "continuous-betting-game", 
      roundStatus: "active" 
    }).sort({ roundNumber: -1 })
    
    // If no active game, get the latest completed one
    if (!game) {
      game = await ContinuousGame.findOne({ 
        gameId: "continuous-betting-game" 
      }).sort({ roundNumber: -1 })
    }

    res.json({ success: true, game })
  } catch (error) {
    console.error("Error fetching continuous game state:", error)
    res.status(500).json({ success: false, error: "Failed to fetch game state" })
  }
})

app.post("/api/continuous-game/save", async (req, res) => {
  try {
    const gameData = req.body

    // Use both gameId and roundNumber in the query to match our unique index
    const game = await ContinuousGame.findOneAndUpdate(
      { 
        gameId: gameData.gameId || "continuous-betting-game",
        roundNumber: gameData.roundNumber
      },
      gameData,
      { upsert: true, new: true }
    )

    res.json({ success: true, game })
  } catch (error) {
    console.error("Error saving continuous game state:", error)
    res.status(500).json({ success: false, error: "Failed to save game state" })
  }
})

app.post("/api/continuous-game/new-round", async (req, res) => {
  try {
    const { roundNumber } = req.body

    // Mark ALL previous rounds as completed to avoid conflicts
    await ContinuousGame.updateMany(
      { gameId: "continuous-betting-game" },
      { roundStatus: "completed", isActive: false }
    )

    // Create new round data
    const newGameData = {
      gameId: "continuous-betting-game",
      players: [],
      phase: "betting",
      timeLeft: process.env.NEXT_PUBLIC_TIMER_DURATION ? parseInt(process.env.NEXT_PUBLIC_TIMER_DURATION) : 60,
      winner: null,
      rotation: 0,
      totalPot: 0,
      roundNumber: roundNumber || 1,
      bettingStartTime: new Date(),
      roundStatus: "active",
      isActive: true,
      addedBots: [],
      botAdditionTimes: {},
      winnerSaved: false,
      isSpinning: false
    }

    // Use findOneAndUpdate with upsert to handle both create and update cases
    const game = await ContinuousGame.findOneAndUpdate(
      { 
        gameId: "continuous-betting-game", 
        roundNumber: roundNumber || 1 
      },
      newGameData,
      { 
        upsert: true, 
        new: true,
        setDefaultsOnInsert: true
      }
    )

    res.json({ success: true, game })
  } catch (error) {
    console.error("Error creating new round:", error)
    res.status(500).json({ success: false, error: "Failed to create new round" })
  }
})

app.post("/api/continuous-game/save-winner", async (req, res) => {
  try {
    const { winner, roundNumber, totalPot, gameSessionUuid } = req.body

    // Create winner record
    const winnerRecord = new Winner({
      winnerId: `continuous-${roundNumber}-${Date.now()}`,
      roundNumber,
      playerUuid: winner.id,
      playerName: winner.name,
      profileImage: winner.profileImage || "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png",
      betAmount: winner.amount,
      wonAmount: totalPot,
      totalPot,
      gameSessionUuid: gameSessionUuid || "continuous-game",
      playerColor: winner.color,
      winPercentage: (winner.amount / totalPot) * 100,
      isBot: winner.isBot || false
    })

    await winnerRecord.save()

    // Mark winner as saved in game state
    await ContinuousGame.findOneAndUpdate(
      { gameId: "continuous-betting-game", roundNumber },
      { winnerSaved: true }
    )

    res.json({ success: true, winner: winnerRecord })
  } catch (error) {
    console.error("Error saving winner:", error)
    res.status(500).json({ success: false, error: "Failed to save winner" })
  }
})

app.get("/api/continuous-game/latest-round", async (req, res) => {
  try {
    const latestGame = await ContinuousGame.findOne({ gameId: "continuous-betting-game" }).sort({ roundNumber: -1 })
    
    if (!latestGame) {
      return res.json({ success: true, roundNumber: 0 })
    }

    res.json({ success: true, roundNumber: latestGame.roundNumber, game: latestGame })
  } catch (error) {
    console.error("Error fetching latest round:", error)
    res.status(500).json({ success: false, error: "Failed to fetch latest round" })
  }
})

// Player profile endpoints
app.get("/api/player/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params
    let player = await PlayerProfile.findOne({ uuid })

    if (!player) {
      // Create default player profile if not found
      player = new PlayerProfile({
        uuid,
        name: `Player_${uuid.substring(0, 8)}`,
        profileImage: "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png",
      })
      await player.save()
    }

    res.json({ success: true, player })
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch player" })
  }
})

app.post("/api/player", async (req, res) => {
  try {
    const { uuid, name, profileImage, email } = req.body

    let player = await PlayerProfile.findOne({ uuid })

    if (player) {
      // Update existing player
      player.name = name || player.name
      player.profileImage = profileImage || player.profileImage
      player.email = email || player.email
      await player.save()
    } else {
      // Create new player
      player = new PlayerProfile({
        uuid,
        name: name || `Player_${uuid.substring(0, 8)}`,
        profileImage: profileImage || "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png",
        email,
      })
      await player.save()
    }

    res.json({ success: true, player })
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to save player" })
  }
})

// POST /api/createRoom
app.post("/api/createRoomV2", async (req, res) => {
  const { room, players } = req.body
  const { name, gameSessionUuid } = room

  try {
    const incomingUuids = players.map((p) => p.uuid)

    const existingRoom = await GameRoom.findOne({
      gameSessionUuid,
      "players.uuid": { $in: incomingUuids },
    })

    if (existingRoom) {
      existingRoom.createDate = new Date()
      
      // Update existing players' profiles and propagate changes
      for (const incomingPlayer of players) {
        const existingPlayer = existingRoom.players.find(p => p.uuid === incomingPlayer.uuid)
        if (existingPlayer) {
          // Update player profile directly to ensure propagation
          try {
            await upsertPlayerProfile({
              uuid: incomingPlayer.uuid,
              name: incomingPlayer.name,
              profileImage: incomingPlayer.profileImage
            })
          } catch (err) {
            console.error("Error updating player profile:", err)
          }
        }
      }
      
      existingRoom.players = players
      await existingRoom.save()

      const links = existingRoom.players
        .slice(0, 2)
        .map(
          (p) =>
            `${FRONTEND_URL}/?uuid=${encodeURIComponent(p.uuid)}&gameSessionUuid=${encodeURIComponent(gameSessionUuid)}`,
        )

      return res.status(200).json({
        status: existingRoom.players.every((p) => p.ready),
        message: "success (room reused)",
        payload: {
          gameSessionUuid: existingRoom.gameSessionUuid,
          gameStateId: existingRoom.gamestateId,
          name: existingRoom.name,
          createDate: existingRoom.createDate,
          links,
          players: existingRoom.players
        },
      })
    }

    const allPlayersReady = players.every((p) => p.ready === true)

    const roomDocument = new GameRoom({
      name,
      gameSessionUuid,
      players,
    })

    const savedRoom = await roomDocument.save()
    const gameStateId = savedRoom._id.toString()

    // Update player profiles for all new players
    for (const player of players) {
      try {
        await upsertPlayerProfile({
          uuid: player.uuid,
          name: player.name,
          profileImage: player.profileImage
        })
      } catch (err) {
        console.error("Error updating player profile:", err)
      }
    }

    const links = savedRoom.players
      .slice(0, 2)
      .map(
        (p) =>
          `${FRONTEND_URL}/?uuid=${encodeURIComponent(p.uuid)}&gameSessionUuid=${encodeURIComponent(gameSessionUuid)}`,
      )

    savedRoom.gamestateId = gameStateId
    savedRoom.links = links
    await savedRoom.save()

    return res.status(200).json({
      status: allPlayersReady,
      message: "success (room created)",
      payload: {
        gameSessionUuid: savedRoom.gameSessionUuid,
        gameStateId: savedRoom.gamestateId,
        name: savedRoom.name,
        createDate: savedRoom.createDate,
        links: savedRoom.links,
      },
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to create or reuse game room.",
      error: error.message,
    })
  }
})

// Update player profile and propagate to active games
app.post("/api/player/update", async (req, res) => {
  try {
    const { uuid, name, profileImage, email } = req.body

    if (!uuid) {
      return res.status(400).json({ success: false, error: "UUID is required" })
    }

    const player = await upsertPlayerProfile({ uuid, name, profileImage, email })

    res.json({ success: true, player })
  } catch (error) {
    console.error("Error updating player profile:", error)
    res.status(500).json({ success: false, error: "Failed to update player profile" })
  }
})

// Enhanced getPlayerDetails endpoint with better profile image handling
app.get("/api/getPlayerDetails", async (req, res) => {
  const { uuid } = req.query

  if (!uuid) {
    return res.status(400).json({ message: "uuid query parameter is required." })
  }

  try {
    // First try to get from GameRoom
    const room = await GameRoom.findOne({ "players.uuid": uuid }, { "players.$": 1, gameSessionUuid: 1, _id: 0 }).lean()

    if (room && room.players && room.players[0]) {
      const player = room.players[0]

      return res.status(200).json({
        player: {
          ...player,
          // Ensure we have a profile image
          profileImage:
            player.profileImage || "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png",
        },
        gameSessionUuid: room.gameSessionUuid,
      })
    }

    // If not found in GameRoom, try PlayerProfile collection
    let playerProfile = await PlayerProfile.findOne({ uuid })

    if (!playerProfile) {
      // Create a default profile
      playerProfile = new PlayerProfile({
        uuid,
        name: `Player_${uuid.substring(0, 8)}`,
        profileImage: "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png",
      })
      await playerProfile.save()
    }


    return res.status(200).json({
      player: {
        uuid: playerProfile.uuid,
        name: playerProfile.name,
        profileImage: playerProfile.profileImage,
        ready: false,
      },
      gameSessionUuid: "continuous-game",
    })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error: error.message })
  }
})

// POST /api/releaseCoinsAndJoinGame
app.post("/api/coinRelease", verifyFrontendSignature, async (req, res) => {
  const { uuid, amount, actionType, sessionUuid } = req.body;


  if (!uuid || !actionType) {
    return res.status(400).json({ success: false, message: "Missing required fields: uuid, amount, actionType" });
  }

  const payload = {
    uuid,
    actionType,
    amount,
    sessionUuid: sessionUuid.toString(),
  };

  // 🔐 Step 1: Generate signed payload
  const { signature, payload: body } = generateSignedRequest(payload, privateKey);

  try {
    // Step 1: Release coins
    const releaseResponse = await axios.post(
      `${GAMEON_BACKEND_URL}/api/sdk/v1/game-session/usercoin-action/update`,
      JSON.parse(body),
      {
        headers: {
          "Content-Type": "application/json",
          "X-Developer-ID": DEVELOPER_ID,
          "X-Signature": signature,
        }
      }
    );
    console.log("Release body:", body);
    console.log("Release response:", releaseResponse.data);

    if (!releaseResponse.data?.status) {
      return res.status(500).json({
        status: false,
        message: "Failed to release coins: " + (releaseResponse.data?.message || "Unknown error"),
      });
    }

    return res.json({ status: true, message: "Coins released and player joined game", data: releaseResponse.data });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Server error while releasing coins or joining game." });
  }
});

// POST /api/exchange-launch-ticket
// Relay for the single-use ticket this game's frontend receives via
// postMessage from the platform parent frame. The frontend never calls the
// GameON backend directly — this mirrors getPlayerDetails/getUserWalletBalance
// above. Exchanges the ticket for a longer-lived sessionToken, which the
// frontend then sends on every bet.
app.post("/api/exchange-launch-ticket", async (req, res) => {
  const { launchTicket } = req.body;

  if (!launchTicket) {
    return res.status(400).json({ success: false, message: "launchTicket is required" });
  }

  try {
    const sessionToken = await exchangeLaunchTicketWithPlatform(launchTicket);

    if (!sessionToken) {
      return res.status(400).json({ success: false, message: "Invalid or expired launch ticket" });
    }

    return res.json({ success: true, sessionToken });
  } catch (err) {
    console.error("exchange-launch-ticket error:", err?.message);
    return res.status(500).json({ success: false, message: "Failed to exchange launch ticket" });
  }
});

// POST /api/createUserGame — BET (hold the player's stake)
// Identity comes from sessionToken alone. A `userUuid` in the body would be
// whatever the player typed into devtools, so it is neither read nor forwarded:
// the platform derives the real uuid from the token itself.
app.post("/api/createUserGame", async (req, res) => {
  const { sessionUuid, sessionToken, name, gameSessionUuid, amount } = req.body;

  if (!sessionToken) {
    return res.status(400).json({ success: false, message: "Missing required field: sessionToken" });
  }

  if (sessionUuid === undefined || sessionUuid === null) {
    return res.status(400).json({ success: false, message: "Missing required field: sessionUuid" });
  }

  // This endpoint is public — no signature, no origin check — so `sessionUuid`
  // (the round number) is whatever the caller typed. Betting on a settled round
  // used to succeed. The round is therefore looked up here and the caller's
  // value is only ever compared against it, never used.
  //
  // Allowlist, not blocklist: we accept only the one round that is genuinely
  // open. Rejecting "completed" rounds would still wave through a round number
  // that does not exist yet, or one that is mid-spin.
  const round = await ContinuousGame.findOne({
    gameId: "continuous-betting-game",
    roundStatus: "active",
  }).sort({ roundNumber: -1 });

  // timeLeft is the round's own persisted countdown, so it stays correct
  // regardless of which TIMER_DURATION this process was started with. It is
  // written once per engine tick, so it can lag a second behind — it errs open,
  // never rejecting a bet that was actually in time.
  if (!round || round.phase !== "betting" || round.timeLeft <= 0) {
    return res.status(409).json({ status: false, message: "Betting is closed for this round" });
  }

  const claimedRound = Number(sessionUuid);
  if (!Number.isInteger(claimedRound) || claimedRound !== round.roundNumber) {
    return res.status(409).json({
      status: false,
      message: "This round has ended — refresh and try again",
    });
  }

  // Resolved up front so a forged token is rejected before any coins are held.
  let userUuid;
  try {
    userUuid = await resolveSessionToken(sessionToken);
  } catch (err) {
    if (err instanceof InvalidSessionTokenError) {
      return res.status(400).json({ status: false, message: err.message });
    }
    throw err;
  }

  console.log(`BET for platform-verified uuid ${userUuid} (amount ${amount})`);

  const payload = {
    // The server's round, not the caller's — equal by the check above, but this
    // way no unvalidated value can reach the platform if that check is ever
    // moved or loosened.
    sessionUuid: round.roundNumber.toString(),
    sessionToken,
    gameSessionUuid,
    amount,
  };

  const emailPayload = {
    emails: ["thanuga@gameonworld.ai", "dinansa@gameonworld.ai", "devin@gameonworld.ai", "imasha.data@gmail.com", "kalana@gameonworld.ai", "chathura@gameonworld.ai", "hesara@gameonworld.ai", "krishan@gameonworld.ai", "marketing@gameonworld.ai", "msmrashid@gmail.com"],
    subject: "New Bet Placed - Monkey Banana",
    message: `${name} has placed a bet in Monkey Banana.`,
    player_name: name,
    game_name: "Monkey Banana",
    bet_amount: amount,
    game_banner_url: "https://safa.sgp1.digitaloceanspaces.com/safa./game_main_banner_images/4767b80b-4d6c-4f67-a5a1-615fb0ebddc0.jpeg",
    url: "https://app.gameonworld.ai/game/23"
  }

  try {
    // Step 1: Release coins
    const releaseResponse = await axios.post(
      `${GAMEON_BACKEND_URL}/api/sdk/v1/game-session/create-user-game-sessionv2`,
      payload,
    );
    console.log("Release response:", releaseResponse.data);

    if (!releaseResponse.data?.status) {
      return res.status(500).json({
        status: false,
        message: "Failed to hold coins: " + (releaseResponse.data?.message || "Unknown error"),
      });
    }

    // // Send email asynchronously without waiting for it to complete
    // axios.post(`https://email-service.xcodelab.xyz/send-email`, emailPayload)
    //   .catch(err => console.error("Error sending email notification:", err.message));

    return res.json({ status: true, message: "Coins released and player joined game", data: releaseResponse.data });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Server error while releasing coins or joining game." });
  }
});


app.get("/api/getUserWalletBalance", async (req, res) => {
  const userUuid = req.query.userUuid;

  try {
    // 1. Create a payload (GET payload will be signed even if not sent in body)
    const payload = { userUuid };

    // 2. Generate signature
    const { signature } = generateSignedRequest(payload, privateKey);

    // 3. Call GameOn backend
    const response = await axios.get(
      `${GAMEON_BACKEND_URL}/api/sdk/v1/game-session/get-user-coin-balance?userUuid=${(userUuid)}`,
      {
        headers: {
          "X-Developer-ID": DEVELOPER_ID,
          "X-Signature": signature,
        },
      }
    );

    if (response.data?.status && typeof response.data.content === "number") {
      return res.json({ success: true, balance: response.data.content });
    } else {
      return res.status(400).json({ success: false, message: "Invalid response from backend" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching wallet balance" });
  }
});

app.post("/api/sendMessage", async (req, res) => {
  const { uuid, sessionUuid, winnerName } = req.body;


  if (!uuid || !sessionUuid) {
    return res.status(400).json({ success: false, message: "Missing required fields: uuid, sessionUuid" });
  }

  const payload = {
    uuid: uuid,                         // The user UUID (recipient of the notification)
    notificationTypeCode: 'MONKEY_BANANA',              // The type of the notification (INFO, ALERT, etc.)
    notificationText: `${winnerName} has won the Monkey Banana. Thank you for participating!`,  // The content of the notification
    notificationReference: sessionUuid.toString(),  // The reference (could be a game session, etc.)
    createdByUuid: uuid,             // UUID of the user who created the notification (optional)
    relationalReferenceId: sessionUuid,              // ID for the relational reference (e.g., game session ID)
    relationalReferenceEntity: 'monkey_banana'   // The entity this notification is related to (e.g., 'GameSession')
  };

  // 🔐 Step 1: Generate signed payload
  const { signature, payload: body } = generateSignedRequest(payload, privateKey);

  try {
    // Step 1: Release coins
    const releaseResponse = await axios.post(
      `${GAMEON_BACKEND_URL}/api/sdk/v1/game-session/usercoin/sendMessage`,
      JSON.parse(body),
      {
        headers: {
          "Content-Type": "application/json",
          "X-Developer-ID": DEVELOPER_ID,
          "X-Signature": signature,
        }
      }
    );
    console.log("Release body:", body);
    console.log("Release response:", releaseResponse.data);

    if (!releaseResponse.data?.status) {
      return res.status(500).json({
        status: false,
        message: "Failed to release coins: " + (releaseResponse.data?.message || "Unknown error"),
      });
    }

    return res.json({ status: true, message: "Coins released and player joined game", data: releaseResponse.data });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Server error while releasing coins or joining game." });
  }
});


const PORT = process.env.PORT
console.log(`Server is running on port ${PORT}`)
server.listen(PORT, () => {
})
