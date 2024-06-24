const availabilityService = require("../services/availability.service");

async function getAvailabilityRoutes(fastify, options) {
  fastify.post("/spaces/:id/availabilities/", availabilityService.addAvailability);
  fastify.get("/spaces/:id/availabilities/", availabilityService.getAvailabilities);
  fastify.put("/availabilities/:id", availabilityService.updateAvailability);
  fastify.delete("/spaces/:spaceId/availabilities/:availabilityId", availabilityService.removeAvailability);
}

module.exports = getAvailabilityRoutes;

