import "dotenv/config";
import express, { Request, Response } from "express";
const app = express();
import mongoose from "mongoose";
import { AddressInfo } from "net";
const mongodb_connection_string =
  process.env.MONGODB_DEV_CONNECTION_STRING ?? "";
const port = Number(process.env.DEV_PORT) ?? 5000;


import {space} from "./models/space.model";
app.get("/v1/spaces/locations", async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        const address = req.query.address;
        const results = await space.aggregate([
            {
                $limit: page*limit,
            },
            {
                $search: {address}
            }
        ]);
        res.status(200).send(results);
    } catch (e) {
        res.status(500).send(e);
    }
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

