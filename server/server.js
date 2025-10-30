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

const privateKeyPath = path.join(__dirname, "./private_key.pem");
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

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

// Socket.io connection handling
// server.js (socket.io part)
io.on("connection", (socket) => {
  socket.on("joinGame", async (gameId) => {
    socket.join(gameId)

    const game = await gameManager.getGame(gameId)
    if (game) {
      socket.emit("gameUpdated", game)
    }
  })

  socket.on("leaveGame", (gameId) => {
    socket.leave(gameId)
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

// Continuous Game Management endpoints
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
          // Update player profile via the update endpoint to ensure propagation
          try {
            await fetch(`http://localhost:${process.env.PORT}/api/player/update`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                uuid: incomingPlayer.uuid,
                name: incomingPlayer.name,
                profileImage: incomingPlayer.profileImage
              }),
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
        await fetch(`http://localhost:${process.env.PORT}/api/player/update`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uuid: player.uuid,
            name: player.name,
            profileImage: player.profileImage
          }),
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
app.post("/api/coinRelease", async (req, res) => {
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


app.post("/api/sendMessage", async (req, res) => {
  const { uuid, sessionUuid } = req.body;


  if (!uuid || !sessionUuid) {
    return res.status(400).json({ success: false, message: "Missing required fields: uuid, sessionUuid" });
  }

  const payload = {
    uuid: uuid,                         // The user UUID (recipient of the notification)
    notificationTypeCode: 'RAFFLE_DRAW_OUTBID',              // The type of the notification (INFO, ALERT, etc.)
    notificationText: 'Your bid has been outbid by another player!',  // The content of the notification
    notificationReference: sessionUuid.toString(),  // The reference (could be a game session, etc.)
    createdByUuid: uuid,             // UUID of the user who created the notification (optional)
    relationalReferenceId: sessionUuid,              // ID for the relational reference (e.g., game session ID)
    relationalReferenceEntity: 'raffle_draw_outbid'   // The entity this notification is related to (e.g., 'GameSession')
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


app.post("/api/airdrop-points", async (req, res) => {
  const { uuid } = req.body;


  if (!uuid) {
    return res.status(400).json({ success: false, message: "Missing required fields: uuid" });
  }

  const payload = {
    "userUuid" : uuid,
    "gameId": "1",
    "points": 1000,
  };

  try {
    const accessToken = await getClientCredentialsToken();
    // Step 1: Release coins
    const releaseResponse = await axios.post(
      AIRDROP_URL,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }
      }
    );

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

// POST /api/releaseCoinsAndJoinGame
app.post("/api/createUserGame", async (req, res) => {
  const { sessionUuid, userUuid, gameSessionUuid, amount } = req.body;


  if (!userUuid) {
    return res.status(400).json({ success: false, message: "Missing required fields: uuid, amount, actionType" });
  }

  const payload = {
    sessionUuid: sessionUuid.toString(),
    userUuid,
    gameSessionUuid,
    amount,
  };

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


const PORT = process.env.PORT
server.listen(PORT, () => {
})
