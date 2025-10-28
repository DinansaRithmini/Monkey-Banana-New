const mongoose = require("mongoose")

const PlayerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  color: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
})

const GameSchema = new mongoose.Schema({
  gameId: { type: String, required: true, unique: true },
  players: [PlayerSchema],
  phase: {
    type: String,
    enum: ["waiting", "betting", "spinning", "finished"],
    default: "waiting",
  },
  timeLeft: { type: Number, default: 60 },
  winner: {
    id: String,
    name: String,
    amount: Number,
    color: String,
  },
  rotation: { type: Number, default: 0 },
  totalPot: { type: Number, default: 0 },
  bettingStartTime: Date,
  botsAdded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 60, // 24 hours
  },
})

// Update expiresAt before saving
GameSchema.pre("save", function (next) {
  this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
  next()
})

module.exports = mongoose.model("Game", GameSchema)
