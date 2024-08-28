import express, { Request, Response } from "express";
import { space } from "../models/space.model";
export const router = express.Router();

router.get("/spaces", async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const results = await space.aggregate([
      {
        $limit: limit,
      },
      {
        $skip: page - 1,
      },
    ]);
    res.status(200).send(results);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/spaces/locations", async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const address = req.query.address as string;
    const pattern = "^" + address.trim();
    const results = await space.aggregate([
      {
        $project: {
          streetNumber: 1,
          streetName: 1,
          city: 1,
          state: 1,
          postalCode: 1,
          country: 1,
          _id: 0,
          id: "$_id",
        },
      },
      {
        $match: {
          $or: [
            { streetNumber: { $regex: pattern, $options: "i" } },
            { streetName: { $regex: pattern, $options: "i" } },
            { city: { $regex: pattern, $options: "i" } },
            { state: { $regex: pattern, $options: "i" } },
            { postalCode: { $regex: pattern, $options: "i" } },
            { country: { $regex: pattern, $options: "i" } },
          ],
        },
      },
      {
        $limit: limit,
      },
      {
        $skip: page - 1,
      },
    ]);
    res.status(200).send(results);
  } catch (e) {
    res.status(500).send(e);
  }
});
