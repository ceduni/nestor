const mongoose = require("mongoose");
const current = new Date();

const availabilitySchema = new mongoose.Schema({
  periodic: {
    type: Boolean,
    required: true
  },
  startAt: {
    type: Date,
    required: true
  },
  endAt: {
    type: Date,
    required: true
  }
});

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  library: {
    type: String
  },
  address: {
    type: String,
    require: true
  },
  capacity: {
    type: Number,
    min: 1,
    require: true
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true
  },
  image: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  organisation: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    enum: ["wifi", "screen", "plug", "projector", "noise cancelling", "whiteboard", "accessible"]
  },
  availabilities: [availabilitySchema],
  type: {
    type: String,
    enum: ["studyRoom", "facility", "nature"]
  }
});

availabilitySchema.pre("save", function(next) {
  const startAtToMilliseconds = this.startAt.getTime();
  const endAtToMilliseconds = this.endAt.getTime();
  const currentToMilliseconds = current.getTime();
  if (startAtToMilliseconds > endAtToMilliseconds) {
    next(new Error("Availability start date can't be greater than availability end date"));
  }
  if (!this.periodic && (endAtToMilliseconds < currentToMilliseconds || startAtToMilliseconds < currentToMilliseconds)) {
    next(new Error("Availability start and end date cannot be older than current date"));
  }
  if (this.startAt.getFullYear() !== this.endAt.getFullYear() || this.startAt.getMonth() !== this.endAt.getMonth() || this.startAt.getDate() !== this.endAt.getDate()) {
    next(new Error("Availability start and end date should be within a day"));
  }
  if ((endAtToMilliseconds - startAtToMilliseconds) / 1000 < 3600) {
    next(new Error("Availability should at least be 1 hour"));
  }
  next();
});

spaceSchema.pre("save", function(next) {
  const avails = this.availabilities;
  const size = avails.length;
  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      const startAtA = avails[j].startAt;
      const endAtA = avails[j].endAt;
      const startAtB = avails[i].startAt;
      const endAtB = avails[i].endAt;
      if (endAtA.getTime() > startAtB.getTime() && startAtA.getTime() < endAtB.getTime()) {
        next(new Error("Two availabilities cannot overlap"));
      }
    }
  }
  next();
});

const space = mongoose.model("space", spaceSchema);

module.exports = space;
