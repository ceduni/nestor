const mongoose = require("mongoose");
const { space, availabilitySchema } = require("./space.model");
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

reservationSchema.pre("save", async function (next) {
  const strArr = this.guests.map((guest) => guest.toString());
  const uniqueStrSet = [...new Set(strArr)];
  this.guests = uniqueStrSet.map((str) => new mongoose.Types.ObjectId(str));
  const spaceResult = await space.findById(this.space);
  if (!spaceResult) {
    next("Space not found");
  }
  const capacity = spaceResult.capacity;
  const indexToUpdate = spaceResult.availabilities.findIndex((avail) =>
    avail._id.equals(this.availability._id),
  );
  if (indexToUpdate === -1) {
    next("Availability not found");
  }
  if (
    this.availability.startAt.getTime() !==
      spaceResult.availabilities[indexToUpdate].startAt.getTime() ||
    this.availability.endAt.getTime() !==
      spaceResult.availabilities[indexToUpdate].endAt.getTime()
  ) {
    next("Reservation availability should match space availability");
  }
  if (this.status === "confirmed") {
    spaceResult.availabilities[indexToUpdate] = Object.assign(
      spaceResult.availabilities[indexToUpdate],
      { isBooked: true },
    );
    spaceResult.save();
  } else if (this.status === "cancelled") {
    spaceResult.availabilities[indexToUpdate] = Object.assign(
      spaceResult.availabilities[indexToUpdate],
      { isBooked: false },
    );
    spaceResult.save();
  }

  if (this.guests.length > capacity) {
    next("Number of guests can not exceed space capacity");
  }
  this.guests.forEach((guest) => {
    if (guest.equals(this.host)) {
      next("Host can not be guest at the same time");
    }
  });
  next();
});

reservationSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.availability.isPeriodic;
  delete obj.availability.isBooked;
  delete obj.__v;
  return obj;
};

reservationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 600, partialFilterExpression: { status: "pending" } },
);

const reservation = mongoose.model("reservation", reservationSchema);

module.exports = reservation;
