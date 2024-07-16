const locationService = require("../services/location.service");

async function getRoutes(fastify) {
  fastify.get("/", locationService.getCities);
}

module.exports = getRoutes;
