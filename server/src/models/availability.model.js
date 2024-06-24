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

availabilitySchema.pre(["save", "findOneAndUpdate"], function(next) {
  const isQuery = this instanceof mongoose.Query;
  const availability = isQuery ? this._update : this;
  const startAt = isQuery ? new Date(availability.startAt) : availability.startAt;
  const endAt = isQuery ? new Date(availability.endAt) : availability.endAt;
  const periodic = availability.periodic;
  if (startAt.getTime() > endAt.getTime()) {
    next(new Error("Availability start date can't be greater than availability end date"));
  }
  if (!periodic && endAt.getTime() < current.getTime()) {
    next(new Error("Availability start and end date cannot be older than current date"));
  }
  if (endAt.getTime() - startAt.getTime() > 86400) {
    next(new Error("Availability should not exceed a day"));
  }
  next();
})

//availabilitySchema.index({ startAt: 1 }, { expireAfterSeconds: 0, partialFilterExpression: { periodic: false } });

const availability = mongoose.model("availability", availabilitySchema);

module.exports = availability;
