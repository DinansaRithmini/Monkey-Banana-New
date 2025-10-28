const mongoose = require("mongoose")

const PlayerProfileSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  profileImage: { type: String, default: null },
  email: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Update the updatedAt field before saving
PlayerProfileSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

module.exports = mongoose.model("PlayerProfile", PlayerProfileSchema)
