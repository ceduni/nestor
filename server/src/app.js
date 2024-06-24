require('dotenv').config();
"use strict";
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
//mongoose.set({ debug: true });
// import routes
const spaceRoutes = require("./routes/space.routes.js");
const availabilityRoutes = require("./routes/availability.routes.js");
// connect to database
mongoose.connect(process.env.MONGODB_TEST_CONNECTION_STRING, {}).then(() => console.log("Connected to the database")).catch((e) => console.log("Error connecting to database", e));

// start server

fastify.register(spaceRoutes, { prefix: "/api/v1/spaces" });
fastify.register(availabilityRoutes, { prefix: "/api/v1" });

const start = () => {
  try {
    fastify.listen({ port: process.env.PORT }, (err) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      fastify.log.info(`Server is running on port ${fastify.server.address().port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
