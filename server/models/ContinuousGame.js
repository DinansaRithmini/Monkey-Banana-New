const mongoose = require("mongoose")

const ContinuousGamePlayerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  color: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
  profileImage: { type: String, required: true },
  isBot: { type: Boolean, default: false }
})

const ContinuousGameSchema = new mongoose.Schema({
  gameId: { 
    type: String, 
    required: true, 
    default: "continuous-betting-game" 
  },
  players: [ContinuousGamePlayerSchema],
  phase: {
    type: String,
    enum: ["betting", "spinning", "finished"],
    default: "betting",
  },
  timeLeft: { type: Number, default: 60 },
  winner: {
    id: String,
    name: String,
    amount: Number,
    color: String,
    profileImage: String,
    isBot: Boolean,
  },
  rotation: { type: Number, default: 0 },
  totalPot: { type: Number, default: 0 },
  roundNumber: { type: Number, default: 1 },
  bettingStartTime: { type: Date, default: Date.now },
  roundStatus: {
    type: String,
    enum: ["active", "completed"],
    default: "active"
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // Track bots added this round
  addedBots: [{ type: String }],
  botAdditionTimes: { type: mongoose.Schema.Types.Mixed, default: {} },
  // Winner save status
  winnerSaved: { type: Boolean, default: false },
  isSpinning: { type: Boolean, default: false },
  coinActionsProcessed: { type: Boolean, default: false }
})

// Update the updatedAt field before saving
ContinuousGameSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

// Index for faster queries
ContinuousGameSchema.index({ gameId: 1, roundNumber: 1 }, { unique: true })
ContinuousGameSchema.index({ roundNumber: -1 })
ContinuousGameSchema.index({ roundStatus: 1 })
ContinuousGameSchema.index({ isActive: 1 })

module.exports = mongoose.model("ContinuousGame", ContinuousGameSchema)