const mongoose = require("mongoose");
const availabilitySchema = require("./space.model").availabilitySchema;
const reservationSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    availability: { type: availabilitySchema, required: true },
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    activity: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["fulfilled", "confirmed", "pending", "cancelled"],
      default: "pending",
    },
    isPrivate: {
      type: Boolean,
      required: true,
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "space",
      required: true,
    },
  },
  { timestamps: true },
);

reservationSchema.pre("save", function (next) {
  const host = this.host;
  const guests = this.guests;
  guests.forEach((guest) => {
    if (guest.equals(host)) {
      next("Host can not be guest at the same time");
    }
  });
  next();
});

reservationSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

const reservation = mongoose.model("reservation", reservationSchema);

module.exports = reservation;
