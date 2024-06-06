"use strict";
require('dotenv').config({ path: './configs/.env' });
const fastify = require('fastify')({ loggger: true });
const mongoose = require('mongoose');
const dev_port = Number(process.env.DEV_PORT);
const mongodb_connection_string = process.env.MONGO_DB_CONNECTION_STRING;
mongoose.connect(mongodb_connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to the database")).catch((e) => console.log("Error connecting to database", e));
fastify.listen({ port: dev_port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
