const availability = require("../models/availability.model");
const space = require("../models/space.model");

async function getAvailabilities(request, reply) {
  try {
    const spaceResult = await space.findById(request.params.id).populate("availabilities").exec();
    if (!spaceResult) {
      return reply.status(404).send("Space not found");
    }
    const availabilities = spaceResult.availabilities;
    reply.send(availabilities);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function addAvailability(request, reply) {
  try {
    const newAvailability = new availability(request.body);
    const newAvailabilityResult = await newAvailability.save();
    const spaceResult = await space.findById(request.params.id);
    if (!spaceResult) {
      return reply.status(404).send("Space not found");
    }
    spaceResult.availabilities.push(newAvailabilityResult._id);
    await spaceResult.save();
    reply.send(newAvailabilityResult);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function updateAvailability(request, reply) {
  try {
    const updatedAvailability = await availability.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!updatedAvailability) {
      return reply.status(404).send("Availability not found");
    }
    reply.send(updatedAvailability);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function removeAvailability(request, reply) {
  try {
    const spaceResult = await space.findById(request.params.spaceId);
    if (!spaceResult) {
      return reply.status(404).send("Space not found");
    }
    spaceResult.availabilities.pull(request.params.availabilityId);
    await spaceResult.save();
    const deletedAvailability = await availability.findByIdAndDelete(request.params.availabilityId);
    if (!deletedAvailability) {
      return reply.status(404).send("Availability not found");
    }
    reply.status(203).send("");
  } catch (error) {
    reply.status(500).send(error);
  }
}

module.exports = {
  addAvailability, getAvailabilities, updateAvailability, removeAvailability
}

