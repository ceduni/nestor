const mongoose = require("mongoose");
const { space, availabilitySchema } = require("./space.model");
const reservationSchema = new mongoose.Schema(
  {
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    availability: { type: availabilitySchema, required: true },
    guestIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
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
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "space",
      required: true,
    },
  },
  { timestamps: true },
);

reservationSchema.pre("save", async function (next) {
  const strArr = this.guestIds.map((guest) => guest.toString());
  const uniqueStrSet = [...new Set(strArr)];
  this.guestIds = uniqueStrSet.map((str) => new mongoose.Types.ObjectId(str));
  const spaceResult = await space.findById(this.spaceId);
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
      spaceResult.availabilities[indexToUpdate].endAt.getTime() ||
    this.availability.isPeriodic !==
      spaceResult.availabilities[indexToUpdate].isPeriodic
  ) {
    next("Reservation availability should match space availability");
  }
  if (this.status === "confirmed") {
    spaceResult.availabilities[indexToUpdate].isBooked = true;
    spaceResult.save();
  } else if (this.status === "cancelled") {
    spaceResult.availabilities[indexToUpdate].isBooked = false;
    spaceResult.save();
  } else if (this.status === "fulfilled") {
    if (this.availability.isPeriodic) {
      spaceResult.availabilities[indexToUpdate].isBooked = false;
    } else {
      spaceResult.availabilities.pull(this.availability._id);
    }
    spaceResult.save();
  }
  if (this.guestIds.length > capacity) {
    next("Number of guests can not exceed space capacity");
  }
  this.guestIds.forEach((guest) => {
    if (guest.equals(this.hostId)) {
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
