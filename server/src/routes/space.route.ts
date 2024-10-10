import express, { query, Request, Response } from "express";
import { space } from "../models/space.model";
export const router = express.Router();

router.get("/spaces", async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const address = req.query.address as string;
    let addressParts;
    if (address) {
      addressParts = address.split(", ");
    }

    console.log(addressParts);
    const results = await space.aggregate([
      {
        $match: {
          $and: [{}],
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
