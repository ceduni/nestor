const space = require("../models/space.model");

async function getSpaces(request, reply) {
  try {
    spaces = await space.find();
    reply.send(spaces);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function getSpace(request, reply) {
  try {
    const result = await space.findById(request.params.id);
    reply.send(result);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function addSpace(request, reply) {
  try {
    const result = new space(request.body);
    reply.send(await result.save());
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function updateSpace(request, reply) {
  try {
    result = await space.findByIdAndUpdate(request.params.id, request.body, { new: true });
    reply.send(result);
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function removeSpace(request, reply) {
  try {
    await space.findByIdAndDelete(request.params.id);
    reply.status(203).send("");
  } catch (error) {
    reply.status(500).send(error);
  }
}

module.exports = {
  getSpaces, getSpace, addSpace, updateSpace, removeSpace
}
