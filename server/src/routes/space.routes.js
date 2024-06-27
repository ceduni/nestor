const spaceService = require("../services/space.service");

async function getRoutes(fastify, options) {
  fastify.get("/", spaceService.getSpaces);
  fastify.get("/:id", spaceService.getSpace);
  fastify.post("/", spaceService.addSpace);
  fastify.put("/:id", spaceService.updateSpace);
  fastify.delete("/:id", spaceService.removeSpace);
  fastify.get("/:id/availabilities/", spaceService.getAvailabilities);
  fastify.post("/:id/availabilities/", spaceService.addAvailability);
  fastify.put("/:spaceId/availabilities/:availId", spaceService.updateAvailability);
  fastify.delete("/:spaceId/availabilities/:availId", spaceService.removeAvailability);
}

module.exports = getRoutes;
