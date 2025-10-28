const mongoose = require("mongoose")

const WinnerSchema = new mongoose.Schema({
  winnerId: { type: String, required: true, unique: true }, // unique ID for each win
  roundNumber: { type: Number, required: true },
  playerUuid: { type: String, required: true },
  playerName: { type: String, required: true },
  profileImage: { type: String, default: null },
  betAmount: { type: Number, required: true },
  wonAmount: { type: Number, required: true },
  totalPot: { type: Number, required: true },
  gameSessionUuid: { type: String, default: "continuous-game" },
  winDate: { type: Date, default: Date.now },
  playerColor: { type: String, required: true },
  winPercentage: { type: Number, required: true }, // percentage of wheel they had
  isBot: {
    type: Boolean,
    default: false
  }
})

// Index for faster queries
WinnerSchema.index({ roundNumber: -1 })
WinnerSchema.index({ winDate: -1 })
WinnerSchema.index({ gameSessionUuid: 1 })

module.exports = mongoose.model("Winner", WinnerSchema)
