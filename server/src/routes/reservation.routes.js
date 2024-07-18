const reservationService = require("../services/reservation.service");
const spaceService = require("../services/space.service");

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
  fastify.put("/:id");
}

module.exports = getRoutes;
