const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  profileImage: { type: String, required: true },
  ready: { type: Boolean, default: false },
});


const RoomSchema = new mongoose.Schema({
  name: { type: String },
  gameSessionUuid: { type: String, required: true },
  gamestateId: { type: String },
  createDate: { type: Date, default: Date.now },
  links: { type: [String], required: true },
  players: { type: [PlayerSchema], required: true },
  gameStatus: { type: String, default: "IN_PROGRESS" }, // Tracks game status
  gameFinishedBy: { type: String, default: null }, // Tracks which player finished the game
});

const GameRoom = mongoose.model("GameRoom", RoomSchema);

module.exports = GameRoom;