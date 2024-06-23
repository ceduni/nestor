require('dotenv').config();
const fastify = require('fastify')({ loggger: true });
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
}).then(() => console.log("Connected to the database")).catch((e: any) => console.log("Error connecting to database", e))

// import routes

