const spaceService = require("../services/space.service");
const spaceSchema = require("../schemas/space.schema");
async function getRoutes(fastify, options) {
  fastify.get("/", spaceService.getSpaces);
  fastify.get("/:id", spaceService.getSpace);
  fastify.post("/",spaceSchema, spaceService.addSpace);
  fastify.put("/:id",spaceSchema, spaceService.updateSpace);
  fastify.delete("/:id", spaceService.removeSpace);
  fastify.post("/:id/availabilities/", spaceService.addAvailability);
  fastify.put("/:spaceId/availabilities/:availId", spaceService.updateAvailability);
  fastify.delete("/:spaceId/availabilities/:availId", spaceService.removeAvailability);
  fastify.post("/:id/images/", spaceService.addImage);
  fastify.put("/:spaceId/images/:imageId", spaceService.updateImage);
  fastify.delete("/:spaceId/images/:imageId", spaceService.removeImage)
}

module.exports = getRoutes;
