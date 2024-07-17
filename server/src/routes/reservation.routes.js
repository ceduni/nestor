const reservationService = require("../services/reservation.service");

async function getRoutes(fastify) {
  fastify.get("/", reservationService.getReservations);
  fastify.post(
    "/",
    {
      schema: {
        body: {
          $ref: "reservationSchema#/schema/body",
        },
      },
    },
    reservationService.addReservation,
  );
}

module.exports = getRoutes;
