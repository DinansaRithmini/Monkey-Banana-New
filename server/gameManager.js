//server/gameManager.js
const Game = require("./models/Game")

const colors = [
  "#FF4500",
  "#FFA500",
  "#FFD700",
  "#FFFF00",
  "#ADFF2F",
  "#00FF00",
  "#00CED1",
  "#0000FF",
  "#4B0082",
  "#85C1E9",
  "#8A2BE2",
  "#EE82EE",
  "#90CAF9",
  "#FFCC80",
  "#CE93D8",
]

class GameManager {
  constructor(io) {
    this.io = io
    this.timers = new Map()
  }

  async createGame() {
    const gameId = Date.now().toString() + Math.random().toString(36).substr(2, 9)

    const game = new Game({
      gameId,
      players: [],
      phase: "waiting",
      timeLeft: process.env.TIMER_DURATION,
      totalPot: 0,
    })

    await game.save()
    return game
  }

  async getGame(gameId) {
    try {
      const game = await Game.findOne({ gameId })
      return game
    } catch (error) {
      return null
    }
  }

  async addPlayer(gameId, playerName, betAmount, profileImage) {
    try {
      const game = await Game.findOne({ gameId })

      if (!game) {
        return { success: false, error: "Game not found" }
      }

      if (game.phase !== "waiting" && game.phase !== "betting") {
        return { success: false, error: "Cannot join game in current phase" }
      }

      // Check if name already exists
      if (game.players.some((p) => p.name.toLowerCase() === playerName.toLowerCase())) {
        return { success: false, error: "Name already taken" }
      }

      const newPlayer = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: playerName.trim(),
        amount: Number(betAmount),
        color: colors[game.players.length % colors.length],
        joinedAt: new Date(),
        profileImage: profileImage
      }

      game.players.push(newPlayer)
      game.totalPot += newPlayer.amount

      // Start betting phase if this is the first player
      if (game.players.length === 1) {
        game.phase = "betting"
        game.bettingStartTime = new Date()
        this.startBettingTimer(gameId)
      }

      await game.save()

      // Broadcast to all clients in this game room
      this.io.to(gameId).emit("gameUpdated", game)

      return { success: true, game, playerId: newPlayer.id }
    } catch (error) {
      return { success: false, error: "Failed to join game" }
    }
  }

  async addBots(gameId, bots) {
    try {
      const game = await Game.findOne({ gameId })

      if (!game) {
        return { success: false, error: "Game not found" }
      }

      if (game.phase !== "betting") {
        return { success: false, error: "Can only add bots during betting phase" }
      }

      for (const bot of bots) {
        // Check if bot already exists in this round
        if (game.players.some(p => p.id === bot.id)) {
          continue;
        }

        const newBot = {
          id: bot.id,
          name: bot.name,
          amount: Number(bot.amount),
          color: colors[game.players.length % colors.length],
          joinedAt: new Date(),
          profileImage: bot.profileImage,
          isBot: true
        }

        game.players.push(newBot)
        game.totalPot += newBot.amount
      }

      await game.save()

      // Broadcast to all clients in this game room
      this.io.to(gameId).emit("gameUpdated", game)

      return { success: true, game }
    } catch (error) {
      return { success: false, error: "Failed to add bots" }
    }
  }

  startBettingTimer(gameId) {
    // Clear existing timer
    if (this.timers.has(gameId)) {
      clearInterval(this.timers.get(gameId))
    }

    const timer = setInterval(async () => {
      try {
        const game = await Game.findOne({ gameId })

        if (!game || game.phase !== "betting") {
          clearInterval(timer)
          this.timers.delete(gameId)
          return
        }

        const timeElapsed = Math.floor((Date.now() - game.bettingStartTime.getTime()) / 1000)
        const timeLeft = Math.max(0, process.env.TIMER_DURATION - timeElapsed)

        if (timeLeft <= 0) {
          // Time's up, start spinning
          await this.startSpinning(gameId)
          clearInterval(timer)
          this.timers.delete(gameId)
        } else {
          // Update time left
          game.timeLeft = timeLeft
          await game.save()

          // Broadcast updated time to all clients
          this.io.to(gameId).emit("gameUpdated", game)
        }
      } catch (error) {
        clearInterval(timer)
        this.timers.delete(gameId)
      }
    }, 1000)

    this.timers.set(gameId, timer)
  }

  async startSpinning(gameId) {
    try {
      const game = await Game.findOne({ gameId })

      if (!game || game.players.length < 1) return

      // Calculate final rotation
      const spins = 8 + Math.random() * 4
      const finalRotation = game.rotation + spins * 360 + Math.random() * 360

      game.phase = "spinning"
      game.rotation = finalRotation
      await game.save()

      // Broadcast spinning state
      this.io.to(gameId).emit("gameUpdated", game)

      // Determine winner after spin animation
      setTimeout(() => {
        this.determineWinner(gameId, finalRotation)
      }, 60000)
    } catch (error) {
      console.error("Error starting spin:", error)
    }
  }

  async determineWinner(gameId, finalRotation) {
    try {
      const game = await Game.findOne({ gameId })
      if (!game) return

      // Calculate segments
      const segments = []
      let currentAngle = 0

      game.players.forEach((player) => {
        const segmentSize = (player.amount / game.totalPot) * 360
        segments.push({
          player,
          startAngle: currentAngle,
          endAngle: currentAngle + segmentSize,
        })
        currentAngle += segmentSize
      })

      // Calculate winner
      const pointerAngle = 270
      const wheelFinalPosition = finalRotation % 360
      let targetAngle = (pointerAngle - wheelFinalPosition) % 360
      if (targetAngle < 0) targetAngle += 360

      const winningSegment = segments.find(
        (segment) => targetAngle >= segment.startAngle && targetAngle < segment.endAngle,
      )

      if (winningSegment) {
        game.phase = "finished"
        game.winner = {
          id: winningSegment.player.id,
          name: winningSegment.player.name,
          amount: winningSegment.player.amount,
          color: winningSegment.player.color,
          isBot: winningSegment.player.isBot || false
        }

        await game.save()

        // If a bot wins, add to past winners
        if (winningSegment.player.isBot) {
          const Winner = require("./models/Winner")
          const winner = new Winner({
            gameSessionUuid: gameId,
            winnerName: winningSegment.player.name,
            winnerUuid: winningSegment.player.id,
            winAmount: game.totalPot,
            winDate: new Date(),
            isBot: true
          })
          await winner.save()
        }

        // Broadcast winner to all clients
        this.io.to(gameId).emit("gameUpdated", game)
      }
    } catch (error) {
      console.error("Error determining winner:", error)
    }
  }

  async resetGame(gameId) {
    try {
      // Clear timer
      if (this.timers.has(gameId)) {
        clearInterval(this.timers.get(gameId))
        this.timers.delete(gameId)
      }

      // Delete old game
      await Game.deleteOne({ gameId })

      // Create new game
      const newGame = await this.createGame()
      return newGame
    } catch (error) {
      throw error
    }
  }
}

module.exports = GameManager