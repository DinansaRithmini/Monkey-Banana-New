// lib/server-game-manager.ts
import type { GameState, Player } from "./types"
import { colors } from "./types"

// Define bot types
interface Bot {
  id: string;
  name: string;
  profileImage: string;
  isBot: boolean;
}

const BOTS: Bot[] = [
  // { id: "bot-1", name: "Cavernus", profileImage: "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png", isBot: true },
  // { id: "bot-2", name: "Volcano", profileImage: "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png", isBot: true },
  // { id: "bot-3", name: "Pixel", profileImage: "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png", isBot: true },
  // { id: "bot-4", name: "Gravity", profileImage: "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png", isBot: true },
  // { id: "bot-5", name: "Ember", profileImage: "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png", isBot: true },
];

const BOT_BET_AMOUNTS = [1, 5];

class ServerGameManager {
  private game: GameState | null = null
  private timer: NodeJS.Timeout | null = null
  private botCheckTimer: NodeJS.Timeout | null = null
  private addedBots: Set<string> = new Set()
  private botAdditionTimes: Map<string, number> = new Map()
  private winnerSaved: boolean = false // Track if winner has been saved
  private isSpinning: boolean = false // Track if wheel is currently spinning
  private coinActionsProcessed: boolean = false // Track if coin actions were processed
  private isInitializing: boolean = true // Track initialization state
  private initializationPromise: Promise<void> | null = null

  constructor() {
    this.initializationPromise = this.initializeGame()
  }

  private async initializeGame() {
    try {
      this.isInitializing = true
      
      // Try to load existing active game from database
      const existingGame = await this.loadGameFromDatabase()
      
      if (existingGame && existingGame.roundStatus === 'active') {
        // Resume existing game
        this.game = this.convertDatabaseGameToGameState(existingGame)
        this.addedBots = new Set(existingGame.addedBots || [])
        this.botAdditionTimes = new Map(Object.entries(existingGame.botAdditionTimes || {}).map(([k, v]) => [k, Number(v)]))
        this.winnerSaved = existingGame.winnerSaved || false
        this.isSpinning = existingGame.isSpinning || false
        this.coinActionsProcessed = existingGame.coinActionsProcessed || false
        
        console.log(`Resumed game round ${this.game.roundNumber} with ${this.game.players.length} players`)
        
        // Resume timers based on current phase
        if (this.game.phase === "betting") {
          this.startRoundTimer(true) // Pass true to indicate this is a resume
          this.startBotCheckTimer()
        } else if (this.game.phase === "spinning") {
          // If it was spinning when server restarted, transition to finished
          // But only if winner hasn't been saved yet
          if (!this.winnerSaved) {
            this.game.phase = "finished"
            this.determineWinner(this.game.rotation)
          } else {
            // Winner already saved, start new round
            setTimeout(() => {
              this.startNewRound()
            }, 1000)
          }
        } else if (this.game.phase === "finished" && !this.winnerSaved) {
          // Handle finished phase that hasn't been processed
          this.determineWinner(this.game.rotation)
        }
      } else {
        // Create new game
        await this.createNewGame()
      }
      
      this.isInitializing = false
      console.log("ServerGameManager initialization completed")
    } catch (error) {
      console.error("Error during ServerGameManager initialization:", error)
      this.isInitializing = false
      // Fallback to create new game on error
      await this.createNewGame().catch(console.error)
    }
  }

  private async createNewGame() {
    // Get the latest round number
    const latestRound = await this.getLatestRoundNumber()
    
    this.game = {
      id: "continuous-betting-game",
      players: [],
      phase: "betting",
      timeLeft: process.env.NEXT_PUBLIC_TIMER_DURATION ? parseInt(process.env.NEXT_PUBLIC_TIMER_DURATION) : 60,
      winner: null,
      rotation: 0,
      totalPot: 0,
      createdAt: Date.now(),
      bettingStartTime: Date.now(),
      roundNumber: latestRound + 1,
      isActive: true,
    }

    this.winnerSaved = false
    this.isSpinning = false
    this.coinActionsProcessed = false
    this.addedBots.clear()
    this.botAdditionTimes.clear()
    
    // Save initial game state to database
    await this.saveGameToDatabase()
    
    this.startRoundTimer()
    this.startBotCheckTimer()
  }

  private async loadGameFromDatabase(): Promise<any | null> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/continuous-game/state`)
      const data = await response.json()
      return data.success ? data.game : null
    } catch (error) {
      console.error("Error loading game from database:", error)
      return null
    }
  }

  private async getLatestRoundNumber(): Promise<number> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/continuous-game/latest-round`)
      const data = await response.json()
      return data.success ? data.roundNumber : 0
    } catch (error) {
      console.error("Error fetching latest round:", error)
      return 0
    }
  }

  private async saveGameToDatabase() {
    if (!this.game) return

    try {
      const gameData = {
        gameId: this.game.id,
        players: this.game.players,
        phase: this.game.phase,
        timeLeft: this.game.timeLeft,
        winner: this.game.winner,
        rotation: this.game.rotation,
        totalPot: this.game.totalPot,
        roundNumber: this.game.roundNumber,
        bettingStartTime: this.game.bettingStartTime ? new Date(this.game.bettingStartTime) : new Date(),
        roundStatus: this.game.phase === "finished" ? "completed" : "active",
        isActive: this.game.isActive,
        addedBots: Array.from(this.addedBots),
        botAdditionTimes: Object.fromEntries(this.botAdditionTimes),
        winnerSaved: this.winnerSaved,
        isSpinning: this.isSpinning,
        coinActionsProcessed: this.coinActionsProcessed
      }

      await fetch(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/continuous-game/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData)
      })
    } catch (error) {
      console.error("Error saving game to database:", error)
    }
  }

  private convertDatabaseGameToGameState(dbGame: any): GameState {
    return {
      id: dbGame.gameId,
      players: dbGame.players,
      phase: dbGame.phase,
      timeLeft: dbGame.timeLeft,
      winner: dbGame.winner,
      rotation: dbGame.rotation,
      totalPot: dbGame.totalPot,
      createdAt: new Date(dbGame.createdAt).getTime(),
      bettingStartTime: new Date(dbGame.bettingStartTime).getTime(),
      roundNumber: dbGame.roundNumber,
      isActive: dbGame.isActive
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (this.isInitializing && this.initializationPromise) {
      await this.initializationPromise
    }
  }

  async getGame(): Promise<GameState | null> {
    await this.ensureInitialized()
    return this.game ? { ...this.game } : null
  }

  getInitializationStatus(): { isInitializing: boolean; hasGame: boolean } {
    return {
      isInitializing: this.isInitializing,
      hasGame: this.game !== null
    }
  }


  // Helper method to send outbid notifications
  private async sendOutbidNotification(uuids: string[], sessionUuid: string | number) {
    try {
      const uuidString = Array.isArray(uuids) ? uuids.join(',') : uuids;
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid: uuidString,
          sessionUuid: sessionUuid,
        }),
      });

      if (!response.ok) {
        console.error("Failed to send outbid notification:", response.statusText);
      } else {
        console.log(`Outbid notification sent to: ${uuidString}`);
      }
    } catch (error) {
      console.error("Error sending outbid notification:", error);
    }
  }

  async addPlayer(
    name: string,
    amount: number,
    userId?: string,
    profileImage?: string,
  ): Promise<{ success: boolean; playerId?: string; error?: string; updated?: boolean }> {
    await this.ensureInitialized()
    
    if (!this.game) {
      return { success: false, error: "Game not initialized" }
    }

    if (this.game.phase !== "betting") {
      return { success: false, error: "Betting is closed for this round" }
    }

    const newBetAmount = Number(amount);

    // Check if user already bet this round (by userId if provided, otherwise by name)
    const existingPlayer = userId
      ? this.game.players.find((p) => p.id === userId)
      : this.game.players.find((p) => p.name.toLowerCase() === name.toLowerCase());

    if (existingPlayer) {
      // ✅ Update existing bet - find outbid players before updating
      const newTotalAmount = existingPlayer.amount + newBetAmount;
      
      // Find all players who will be outbid by this new total amount
      // (excluding bots and the current player)
      const outbiddedPlayers = this.game.players.filter(p => 
        p.id !== existingPlayer.id && // Not the current player
        !p.isBot && // Not a bot
        p.amount < newTotalAmount // Their bet is lower than the new total amount
      );

      // Send notification if there are outbidded players
      if (outbiddedPlayers.length > 0) {
        const outbiddedUuids = outbiddedPlayers.map(p => p.id);
        console.log(`Player ${existingPlayer.name} increased bet to ${newTotalAmount}, notifying ${outbiddedPlayers.length} outbid players:`, outbiddedPlayers.map(p => `${p.name}(${p.amount})`));
        await this.sendOutbidNotification(outbiddedUuids, this.game.roundNumber);
      }

      existingPlayer.amount += newBetAmount;
      this.game.totalPot += newBetAmount;
      
      // Save state to database
      this.saveGameToDatabase()
      
      return { success: true, playerId: existingPlayer.id, updated: true };
    }

    // New player logic - check if this new bet will outbid existing players
    const currentHighestAmount = this.game.players.length > 0 ? Math.max(...this.game.players.map(p => p.amount)) : 0;
    
    // Ensure we have a profile image
    const playerProfileImage =
      profileImage || "https://safa.sgp1.digitaloceanspaces.com/safa./avatar_images/Ravex_M.png"

    const newPlayer: Player = {
      id: userId || Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      amount: newBetAmount,
      color: colors[this.game.players.length % colors.length],
      joinedAt: Date.now(),
      profileImage: playerProfileImage,
      isBot: undefined
    }

    // Check if this new player will outbid existing players
    if (this.game.players.length > 0) {
      // Find all players who will be outbid by this new bet (excluding bots)
      const outbiddedPlayers = this.game.players.filter(p => 
        !p.isBot && // Not a bot
        p.amount < newBetAmount // Their bet is lower than the new bet
      );

      // Send notification if there are outbidded players
      if (outbiddedPlayers.length > 0) {
        const outbiddedUuids = outbiddedPlayers.map(p => p.id);
        console.log(`New player ${newPlayer.name} with bet ${newBetAmount} outbid ${outbiddedPlayers.length} players:`, outbiddedPlayers.map(p => `${p.name}(${p.amount})`));
        await this.sendOutbidNotification(outbiddedUuids, this.game.roundNumber);
      }
    }

    this.game.players.push(newPlayer)
    this.game.totalPot += newPlayer.amount

    // Save state to database
    this.saveGameToDatabase()

    return { success: true, playerId: newPlayer.id }
  }

  async addBots(bots: { name: string; amount: number; id: string; profileImage: string }[]): Promise<{ success: boolean; error?: string }> {
    await this.ensureInitialized()
    
    if (!this.game) {
      return { success: false, error: "Game not initialized" }
    }

    if (this.game.phase !== "betting") {
      return { success: false, error: "Can only add bots during betting phase" }
    }

    // Count real players (excluding bots)
    const realPlayers = this.game.players.filter(player => !player.id.startsWith('bot-'));

    // Only add bots if there are less than 5 real players
    if (realPlayers.length >= 5) {
      return { success: false, error: "No need for bots - already have 5+ real players" };
    }

    for (const bot of bots) {
      // Check if bot already exists in this round
      if (this.addedBots.has(bot.id) || this.game.players.some(p => p.id === bot.id)) {
        continue;
      }

      const newBot: Player = {
        id: bot.id,
        name: bot.name,
        amount: Number(bot.amount),
        color: colors[this.game.players.length % colors.length],
        joinedAt: Date.now(),
        profileImage: bot.profileImage,
        isBot: true
      }

      this.game.players.push(newBot)
      this.addedBots.add(bot.id)
      this.botAdditionTimes.set(bot.id, Date.now())
    }

    // Save state to database
    this.saveGameToDatabase()

    return { success: true }
  }

  private startRoundTimer(isResume: boolean = false) {
    if (this.timer) {
      clearInterval(this.timer)
    }

    if (!this.game) return

    // Only reset betting start time if this is a new round, not a resume
    if (!isResume) {
      this.game.bettingStartTime = Date.now()
    }

    this.timer = setInterval(() => {
      if (!this.game || this.game.phase !== "betting") {
        return
      }

      const timeElapsed = Math.floor((Date.now() - (this.game.bettingStartTime || 0)) / 1000)
      const timeLeft = Math.max(0, (process.env.NEXT_PUBLIC_TIMER_DURATION ? parseInt(process.env.NEXT_PUBLIC_TIMER_DURATION) : 60) - timeElapsed)

      this.game.timeLeft = timeLeft

      // Save state every 5 seconds to keep timer in sync
      if (timeElapsed % 5 === 0) {
        this.saveGameToDatabase()
      }

      if (timeLeft <= 0) {
        this.endBettingPhase()
      }
    }, 1000)
  }

  private startBotCheckTimer() {
    if (this.botCheckTimer) {
      clearInterval(this.botCheckTimer)
    }

    this.botCheckTimer = setInterval(() => {
      if (!this.game || this.game.phase !== "betting" || this.isSpinning) {
        return
      }

      // Count real players (excluding bots)
      const realPlayers = this.game.players.filter(player => !player.id.startsWith('bot-'));

      // Only add bots if there are less than 5 real players
      if (realPlayers.length < 5) {
        // Add bots at random intervals (not all at once)
        const shouldAddBot = Math.random() < 0.3; // 30% chance to add a bot each check

        if (shouldAddBot) {
          this.addSingleBot();
        }
      }
    }, 3000); // Check every 3 seconds
  }

  private async addSingleBot() {
    await this.ensureInitialized()
    if (!this.game || this.isSpinning) return;

    // Count real players (excluding bots)
    const realPlayers = this.game.players.filter(player => !player.id.startsWith('bot-'));

    // Only add bots if there are less than 5 real players
    if (realPlayers.length >= 5) return;

    const availableBots = BOTS.filter(bot => !this.addedBots.has(bot.id));
    if (availableBots.length === 0) return;

    const randomBot = availableBots[Math.floor(Math.random() * availableBots.length)];
    const randomAmount = BOT_BET_AMOUNTS[Math.floor(Math.random() * BOT_BET_AMOUNTS.length)];

    const newBot: Player = {
      id: randomBot.id,
      name: randomBot.name,
      amount: Number(randomAmount),
      color: colors[this.game.players.length % colors.length],
      joinedAt: Date.now(),
      profileImage: randomBot.profileImage,
      isBot: true
    }

    this.game.players.push(newBot)
    this.addedBots.add(randomBot.id)
    this.botAdditionTimes.set(randomBot.id, Date.now())
    
    // Save state to database
    this.saveGameToDatabase()
  }

  private endBettingPhase() {
    if (!this.game) return

    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }

    if (this.botCheckTimer) {
      clearInterval(this.botCheckTimer)
      this.botCheckTimer = null
    }

    if (this.game.players.length === 0) {
      // No players, immediately start new round
      console.log("No players in round, starting new round immediately")
      this.startNewRound()
    } else {
      // Start spinning
      this.startSpinning()
    }
  }

  private startSpinning() {
    if (!this.game) return

    // Reset winner saved flag and set spinning flag
    this.winnerSaved = false
    this.isSpinning = true


    const spins = 8 + Math.random() * 4
    const finalRotation = this.game.rotation + spins * 360 + Math.random() * 360


    this.game.phase = "spinning"
    this.game.rotation = finalRotation

    // Save state to database
    this.saveGameToDatabase()

    // Determine winner after spin animation (15 seconds to match frontend)
    setTimeout(() => {
      this.determineWinner(finalRotation)
    }, 5000)
  }

  private async determineWinner(finalRotation: number) {
    if (!this.game || this.winnerSaved) return
    
    // If game is already finished and has a winner, don't process again
    if (this.game.phase === "finished" && this.game.winner) {
      console.log("Winner already determined, skipping duplicate processing")
      return
    }

    // Calculate segments
    const segments: { player: Player; startAngle: number; endAngle: number }[] = []
    let currentAngle = 0

    this.game.players.forEach((player) => {
      const segmentSize = (player.amount / this.game!.totalPot) * 360
      segments.push({
        player,
        startAngle: currentAngle,
        endAngle: currentAngle + segmentSize,
      })
      currentAngle += segmentSize
    })

    // Check for forced winner first
    const pointerAngle = 270
    const wheelFinalPosition = finalRotation % 360
    let targetAngle = (pointerAngle - wheelFinalPosition) % 360
    if (targetAngle < 0) targetAngle += 360

    const winningSegment = segments.find(
      (segment) => targetAngle >= segment.startAngle && targetAngle < segment.endAngle,
    )

    if (winningSegment) {
      this.game.phase = "finished"
      this.game.winner = winningSegment.player
      this.isSpinning = false // Reset spinning flag

      // Save state to database
      this.saveGameToDatabase()

      // Save ONLY the actual winner to database
      await this.saveWinnerToDatabase(winningSegment.player, this.game.roundNumber, this.game.totalPot)

      // Handle coin releases and airdrop for all players
      await this.handleRoundFinishCoinActions()

      // Start new round after showing winner (8 seconds to let users see the result)
      setTimeout(() => {
        this.startNewRound()
      }, 5000)
    }
  }

  private async handleRoundFinishCoinActions() {
    if (!this.game || !this.game.winner) return;
    
    // Skip if coin actions were already processed
    if (this.coinActionsProcessed) {
      console.log("Coin actions already processed, skipping")
      return;
    }

    try {
      // Process CAPTURE for all real players (deduct bets)
      for (const player of this.game.players) {
        if (player.isBot) continue;
        if (player.id === this.game.winner.id) continue; // 🚀 Skip winner

        await fetch(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/coinRelease`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: player.id,
            actionType: "CAPTURE",
            amount: player.amount,
            sessionUuid: this.game.roundNumber,
          }),
        });
      }

      // Process WIN and airdrop for winner if not a bot
      if (!this.game.winner.isBot) {
        const winnings = this.game.totalPot - this.game.winner.amount;

        // Award winnings
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/coinRelease`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: this.game.winner.id,
            actionType: "WIN",
            amount: winnings + 100,
            sessionUuid: this.game.roundNumber,
          }),
        });

        //Award airdrop points
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/airdrop-points`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: this.game.winner.id,
          }),
        });
      }
      
      // Mark coin actions as processed
      this.coinActionsProcessed = true;
      this.saveGameToDatabase(); // Save the flag immediately
      
    } catch (err) {
      console.error("Error handling round finish coin actions:", err);
    }
  }

  private async saveWinnerToDatabase(winner: Player, roundNumber: number, totalPot: number) {
    try {
      // Double-check that we haven't already saved this winner
      if (this.winnerSaved) {
        console.log("Winner already saved, skipping duplicate save");
        return;
      }

      console.log("Saving winner to database:", winner.name, winner.isBot ? "(Bot)" : "(Real Player)");

      // Save to database via server endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/continuous-game/save-winner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          winner,
          roundNumber,
          totalPot,
          gameSessionUuid: "continuous-game"
        }),
      })

      if (response.ok) {
        console.log("Winner successfully saved to database");
        this.winnerSaved = true; // Mark winner as saved
      } else {
        console.error("Failed to save winner to database");
      }
    } catch (error) {
      console.error("Error saving winner to database:", error);
    }
  }

  private async startNewRound() {
    if (!this.game) return

    const nextRoundNumber = this.game.roundNumber + 1

    // Create new round via server endpoint
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/continuous-game/new-round`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roundNumber: nextRoundNumber
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Update local game state with new round data
          this.game = this.convertDatabaseGameToGameState(data.game)
        }
      }
    } catch (error) {
      console.error("Error creating new round:", error)
      // Fallback to local creation
      this.game = {
        ...this.game,
        players: [],
        phase: "betting",
        timeLeft: process.env.NEXT_PUBLIC_TIMER_DURATION ? parseInt(process.env.NEXT_PUBLIC_TIMER_DURATION) : 60,
        winner: null,
        totalPot: 0,
        bettingStartTime: Date.now(),
        roundNumber: nextRoundNumber,
        rotation: 0, // Reset rotation for new round
      }
    }

    // Clear added bots for the new round
    this.addedBots.clear();
    this.botAdditionTimes.clear();
    this.winnerSaved = false; // Reset winner saved flag
    this.isSpinning = false; // Reset spinning flag
    this.coinActionsProcessed = false; // Reset coin actions flag

    this.startRoundTimer()
    this.startBotCheckTimer()
  }

  cleanup() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }

    if (this.botCheckTimer) {
      clearInterval(this.botCheckTimer)
      this.botCheckTimer = null
    }
  }
}

// Create singleton instance
export const serverGameManager = new ServerGameManager()

// Cleanup on process exit
process.on("SIGINT", () => {
  serverGameManager.cleanup()
  process.exit(0)
})

process.on("SIGTERM", () => {
  serverGameManager.cleanup()
  process.exit(0)
})