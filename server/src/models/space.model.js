const mongoose = require("mongoose");
const spaceSchema = require("../schemas/space.schema");
const currentDate = new Date();

spaceSchema.pre("save", function(next) {

  const size = this.availabilities.length;

  for (let i = 0; i < size; i++) {
    const startDate = this.availabilities[i].startTime;
    const endDate = this.availabilities[i].endTime;
    const periodic = this.availabilities[i].periodic;
    if (startDate.getTime() > endDate.getTime()) {
      next(new Error("Availability start date can't be greater than availability end date"));
    }
    if (!periodic && endDate.getTime() < currentDate.getTime()) {
      next(new Error("Availability start and end date cannot be older than current date"));
    }

  }

  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      const startDateA = this.availabilities[j].startTime;
      const endDateA = this.availabilities[j].endTime;
      const startDateB = this.availabilities[i].startTime;
      const endDateB = this.availabilities[i].endTime;
      if (endDateA.getTime() > startDateB.getTime() && startDateA < endDateB) {
        next(new Error("Two availabilities cannot overlap"));
      }
    }
  }

  next();
})
const space = mongoose.model("space", spaceSchema);

module.exports = space;
