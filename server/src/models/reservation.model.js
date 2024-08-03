const mongoose = require("mongoose");
const { space, availabilitySchema } = require("./space.model");
const reservationSchema = new mongoose.Schema(
  {
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    availability: { type: availabilitySchema, required: true, unique: true },
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
  const reservations = await reservation.find();
  reservations.some((reservation) => {
    const isInvalid =
      reservation.availability._id.equals(this.availability._id) &&
      (reservation.status === "pending" ||
        reservation.status === "confirmed") &&
      reservation.availability.endAt.getTime() >
        this.availability.startAt.getTime() &&
      reservation.availability.startAt.getTime() <
        this.availability.endAt.getTime();
    if (isInvalid) {
      next("availability already taken or temporarily disable");
    }
    return isInvalid;
  });
  if (!spaceResult) {
    next("Space not found");
  }
  const indexOfAvail = spaceResult.availabilities.findIndex((avail) =>
    avail._id.equals(this.availability._id),
  );
  if (indexOfAvail === -1) {
    next("Reservation availability id should match space availability id");
  }
  if (
    this.availability.startAt.getTime() <
      spaceResult.availabilities[indexOfAvail].startAt.getTime() ||
    this.availability.endAt.getTime() >
      spaceResult.availabilities[indexOfAvail].endAt.getTime()
  ) {
    next("Reservation availability should be included in space availability");
  }

  const capacity = spaceResult.capacity;
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
  delete obj.__v;
  return obj;
};

reservationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 600, partialFilterExpression: { status: "pending" } },
);

const reservation = mongoose.model("reservation", reservationSchema);

module.exports = reservation;
