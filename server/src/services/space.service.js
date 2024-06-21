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
    reply.send("TODO");
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function addSpace(request, reply) {
  try {
    reply.send("TODO");
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function updateSpace(request, reply) {
  try {
    reply.send("TODO");
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function removeSpace(request, reply) {
  try {
    reply.send("TODO");
  } catch (error) {
    reply.status(500).send(error);
  }
}

module.exports = {
  getSpaces, getSpace, addSpace, updateSpace, removeSpace
}
