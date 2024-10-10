import "dotenv/config";
import express, { Request, Response } from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import { AddressInfo } from "net";
import { router as spaceRoutes } from "./routes/space.route";

// connect to database
const mongodb_connection_string =
  process.env.MONGODB_CLOUD_CONNECTION_STRING ?? "";
const port = Number(process.env.DEV_PORT) ?? 5000;

// configure cross origin
app.use(cors());

// register routes
app.use("/v1", spaceRoutes);

//connect to express server
mongoose
  .connect(mongodb_connection_string)
  .then((mongoose) => {
    console.log("Connected successfully to MongoDB");

    const server = app
      .listen(port, "127.0.0.1", () => {
        const { address, port } = server.address() as AddressInfo;
        console.log("Server running at http://" + address + ":" + port);
      })
      .on("error", (error: Error) => {
        console.error("Error connecting to server:", error);
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
