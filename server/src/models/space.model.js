const mongoose = require("mongoose");
const current = new Date();

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  isMain: {
    type: Boolean,
    required: true,
  },
});
const availabilitySchema = new mongoose.Schema({
  startAt: {
    type: Date,
    required: true,
  },
  endAt: {
    type: Date,
    required: true,
  }
});

const spaceLockSchema = new mongoose.Schema({
  expireAt: {
    type: Date,
    default: new Date(),
    expires: 840,
  },
  spaceId: { type: mongoose.Schema.ObjectId, ref: "space", unique: true },
});

const spaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    library: {
      type: String,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      min: 1,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    images: {
      type: [imageSchema],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    organisation: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      enum: [
        "wifi",
        "screen",
        "plug",
        "projector",
        "noise cancelling",
        "whiteboard",
        "accessible",
      ],
      required: true,
    },
    availabilities: {
      type: [availabilitySchema],
      required: true,
    },
    type: {
      type: [String],
      enum: [
        "university",
        "library",
        "facility",
        "nature",
        "coffee",
        "laboratory",
        "studyRoom",
      ],
      required: true,
    },
  },
  { timestamps: true },
);

availabilitySchema.pre("save", function (next) {
  const startAtToMilliseconds = this.startAt.getTime();
  const endAtToMilliseconds = this.endAt.getTime();
  if (startAtToMilliseconds > endAtToMilliseconds) {
    next(
      new Error(
        "Availability start date can't be greater than availability end date",
      ),
    );
  }
  /*if (!this.isPeriodic && (endAtToMilliseconds < currentToMilliseconds || startAtToMilliseconds < currentToMilliseconds)) {
    next(new Error("Availability start and end date cannot be older than current date"));
  }*/
  if (
    this.startAt.getUTCFullYear() !== this.endAt.getUTCFullYear() ||
    this.startAt.getUTCMonth() !== this.endAt.getUTCMonth() ||
    this.startAt.getUTCDate() !== this.endAt.getUTCDate()
  ) {
    next(new Error("Availability start and end date should be within a day"));
  }
  if ((endAtToMilliseconds - startAtToMilliseconds) / 1000 < 3600) {
    next(new Error("Availability should at least be 1 hour"));
  }
  next();
});

spaceSchema.pre("save", function (next) {
  const avails = this.availabilities;
  for (let i = 0; i < avails.length; i++) {
    for (let j = i + 1; j < avails.length; j++) {
      const startAtA = avails[j].startAt;
      const endAtA = avails[j].endAt;
      const startAtB = avails[i].startAt;
      const endAtB = avails[i].endAt;
      if (
        endAtA.getTime() > startAtB.getTime() &&
        startAtA.getTime() < endAtB.getTime()
      ) {
        next(new Error("Two availabilities cannot overlap"));
      }
    }
  }
  next();
});

spaceSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
};

const space = mongoose.model("space", spaceSchema);

/*imageSchema.pre("save", function(next) {
  next();
})*/
module.exports = { space, availabilitySchema };
