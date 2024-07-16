const mongoose = require("mongoose");
const reservationSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  availability: { type: mongoose.Schema.Types.ObjectId },
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  activity: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["fulfilled", "confirmed", "pending", "cancelled"],
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
  spaceId: { type: mongoose.Schema.Types.ObjectId, ref: "space" },
});

const reservation = mongoose.model("reservation", reservationSchema);

module.exports = reservation;
