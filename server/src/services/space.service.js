const space = require("../models/space.model");

async function getSpaces(request, reply) {
  try {
    const spaces = await space.find();
    if (!spaces) {
      return reply.status(404).send("No space found");
    }
    reply.send(spaces);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function getSpace(request, reply) {
  try {
    const spaceResult = await space.findById(request.params.id);
    if (!spaceResult) {
      return reply.status(404).send("Space not found");
    }
    reply.send(spaceResult);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function addSpace(request, reply) {
  try {
    const newSpace = new space(request.body);
    const newSpaceResult = await newSpace.save();
    reply.send(newSpaceResult);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function updateSpace(request, reply) {
  try {
    const updatedSpace = await space.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!updatedSpace) {
      return reply.status(404).send("Space not found");
    }
    reply.send(updatedSpace);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function removeSpace(request, reply) {
  try {
    const deletedSpace = await space.findByIdAndDelete(request.params.id);
    if (!deletedSpace) {
      return reply.status(404).send("Space not found");
    }
    reply.status(203).send("");
  } catch (error) {
    reply.status(500).send(error);
  }
}

module.exports = {
  getSpaces, getSpace, addSpace, updateSpace, removeSpace
}
