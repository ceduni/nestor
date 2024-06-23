const spaceService = require("../services/space.service");

async function getRoutes(fastify, options) {
  fastify.get("/", spaceService.getSpaces);
  fastify.get("/:id", spaceService.getSpace);
  fastify.post("/", spaceService.addSpace);
  fastify.put("/:id", spaceService.updateSpace);
  fastify.delete("/:id", spaceService.removeSpace);
}

module.exports = getRoutes;
