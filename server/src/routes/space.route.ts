import express, { query, Request, Response } from "express";
import { space } from "../models/space.model";
export const router = express.Router();

router.get("/spaces", async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const address = req.query.address as string;
    const capacity = Number(req.query.capacity) || 1;
    const agg_pipeline = [];
    console.log(req.query);
    if (address) {
      const search_pipeline = {
        $search: {
          index: "default",
          autocomplete: {
            query: address.trim(),
            path: "fullAddress",
          },
        },
      };
      agg_pipeline.push(search_pipeline);
    }
    agg_pipeline.push({
      $match: {
        $and: [
          {
            capacity: {
              $gte: capacity,
            },
          },
        ],
      },
    });
    agg_pipeline.push({
      $limit: limit,
    });
    agg_pipeline.push({
      $skip: page - 1,
    });
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
