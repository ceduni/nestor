require("dotenv").config();
("use strict");
const fastify = require("fastify")({
  logger: true,
  ajv: {
    customOptions: {
      removeAdditional: false,
      keywords: ["schema"],
    },
  },
});
const cors = require("@fastify/cors");
const mongoose = require("mongoose");
mongoose.set({ debug: true });

// import tasks
//const { reservationTask, spaceTask } = require("../scripts/ttl.script");

// import routes
const spaceRoutes = require("./routes/space.routes.js");
const locationRoutes = require("./routes/location.routes.js");
const reservationRoutes = require("./routes/reservation.routes.js");
const userRoutes = require("./routes/user.routes.js");

// import schemas
const spaceSchema = require("./schemas/space.schema.js");
const reservationSchema = require("./schemas/reservation.schema.js");
// connect to database
mongoose
  .connect(process.env.MONGODB_CLOUD_CONNECTION_STRING, {})
  .then(() => console.log("Connected to the database"))
  .catch((e) => console.log("Error connecting to database", e));

// run tasks
//reservationTask.start();
//spaceTask.start();

// start server
fastify.register(spaceRoutes, { prefix: "/api/v1/spaces" });
fastify.register(locationRoutes, { prefix: "/api/v1/cities" });
fastify.register(reservationRoutes, { prefix: "/api/v1/reservations" });
fastify.register(userRoutes, { prefix: "/api/v1/users" });
fastify.addSchema(spaceSchema);
fastify.addSchema(reservationSchema);
fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

fastify.register(require("@fastify/websocket"));
fastify.register(async function (fastify) {
  fastify.get(
    "/api/v1/reservations/new",
    { websocket: true },
    (socket, req) => {
      socket.on("message", (message) => {
        fastify.websocketServer.clients.forEach((client) => {
          if (client.readyState === client.OPEN) {
            if (client !== socket) client.send(message);
          }
        });
      });
    },
  );
});

const start = () => {
  try {
    fastify.listen({ port: process.env.PORT }, (err) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      fastify.log.info(
        `Server is running on port ${fastify.server.address().port}`,
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = fastify;
