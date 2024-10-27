import express, { query, Request, Response } from "express";
import { space } from "../models/space.model";
export const router = express.Router();

router.get("/spaces", async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      address,
      capacity = 1,
      features,
      date = new Date(),
    } = req.query;

    const agg_pipeline: any[] = [];
    if (address) {
      agg_pipeline.push({
        $search: {
          index: "default",
          autocomplete: {
            query: (address as string).trim(),
            path: "fullAddress",
          },
        },
      });
    }
    const match_conditions: any[] = [
      { capacity: { $gte: Number(capacity) } },
      { "availabilities.startAt": { $gte: new Date(date as string) } },
    ];

    if (features) {
      match_conditions.push({
        features: { $all: (features as string).split(",") },
      });
    }

    agg_pipeline.push(
      { $unwind: "$availabilities" },
      { $match: { $and: match_conditions } },
      { $limit: Number(limit) },
      { $skip: (Number(page) - 1) * Number(limit) },
    );

    const results = await space.aggregate(agg_pipeline);
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
    const results = await space.aggregate([
      {
        $search: {
          index: "default",
          autocomplete: {
            query: address.trim(),
            path: "fullAddress",
          },
        },
      },
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
