const mongoose = require("mongoose");
const spaceSchema = require("../schemas/space.schema");
const currentDate = new Date();

const availabilityConstraint = (avail, next) => {

  const size = avail.length;

  for (let i = 0; i < size; i++) {
    const startDate = avail[i].startTime;
    const endDate = avail[i].endTime;
    const periodic = avail[i].periodic;
    if (startDate.getTime() > endDate.getTime()) {
      next(new Error("Availability start date can't be greater than availability end date"));
    }
    if (!periodic && endDate.getTime() < currentDate.getTime()) {
      next(new Error("Availability start and end date cannot be older than current date"));
    }

  }

  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      const startDateA = avail[j].startTime;
      const endDateA = avail[j].endTime;
      const startDateB = avail[i].startTime;
      const endDateB = avail[i].endTime;
      if (endDateA.getTime() > startDateB.getTime() && startDateA < endDateB) {
        next(new Error("Two availabilities cannot overlap"));
      }
    }
  }

}

spaceSchema.pre(["save", "findOneAndUpdate"], function(next) {
  availabilityConstraint(this.availabilities, next);
  next();
})
const space = mongoose.model("space", spaceSchema);

module.exports = space;
