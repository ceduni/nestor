const reservationService = require("../services/reservation.service");

async function getRoutes(fastify) {
  fastify.get("/", reservationService.getReservations);
}

module.exports = getRoutes;
