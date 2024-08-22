import "dotenv/config";
import express, { Request, Response } from "express";
const app = express();
import mongoose, { Schema } from "mongoose";
import { AddressInfo, Socket } from "net";
const mongodb_connection_string =
  process.env.MONGODB_DEV_CONNECTION_STRING ?? "";
const port = Number(process.env.DEV_PORT) ?? 5000;


import {space} from "./models/space.model";
app.get("/v1/spaces/locations", (req: Request, res: Response) => {

});

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

