const space = require("../models/space.model").space;
const mongoose = require("mongoose");

async function getSpaces(req, rep) {
  try {
    const spaces = await space.find({ isAvailable: true });
    rep.send(spaces);
  } catch (error) {
    rep.status(500).send(error);
  }
}

async function getSpace(req, rep) {
  try {
    const spaceResult = await space.findById(req.params.id);
    rep.send(spaceResult);
  } catch (error) {
    rep.status(500).send(error);
  }
}

async function addSpace(req, rep) {
  try {
    const newSpace = new space(req.body);
    const newSpaceResult = await newSpace.save();
    rep.send(newSpaceResult);
  } catch (error) {
    rep.status(500).send(error);
  }
}

async function updateSpace(req, rep) {
  try {
    const updatedSpace = await space.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedSpace) {
      return rep.status(404).send("Space not found");
    }
    rep.send(updatedSpace);
  } catch (error) {
    rep.status(500).send(error);
  }
}

/*async function getAvailabilities(req, rep) {
  try {
    const result = await space.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $project: {
          _id: 0,
          availabilities: 1
        }
      }
    ]);
    if (!result) {
      return rep.status(404).send("No Space found");
    }
    const availabilities = result[0].availabilities;
    if (!availabilities || availabilities.length === 0) {
      return rep.status(404).send("No availability found");
    }
    rep.send(availabilities);
  } catch (error) {
    rep.status(500).send(error);
  }
}*/

async function addAvailability(req, rep) {
  try {
    const spaceResult = await space.findById(req.params.id);
    if (!spaceResult) {
      return rep.status(404).send("Space not found");
    }
    spaceResult.availabilities.push(req.body);
    const updatedSpace = await spaceResult.save();
    rep.send(updatedSpace);
  } catch (err) {
    rep.status(500).send(err);
  }
}

async function updateAvailability(req, rep) {
  try {
    const spaceResult = await space.findById(req.params.spaceId);
    if (!spaceResult) {
      return rep.status(404).send("Space not found");
    }
    const availIdCasted = new mongoose.Types.ObjectId(req.params.availId);
    const indexToUpdate = spaceResult.availabilities.findIndex((avail) =>
      avail._id.equals(availIdCasted),
    );
    if (indexToUpdate === -1) {
      return rep.status(404).send("Availability not found");
    }
    spaceResult.availabilities[indexToUpdate] = Object.assign(
      spaceResult.availabilities[indexToUpdate],
      req.body,
    );
    const updatedSpace = await spaceResult.save();
    rep.send(updatedSpace);
  } catch (error) {
    rep.status(500).send(error);
  }
}

async function removeAvailability(req, rep) {
  try {
    const spaceResult = await space.findOneAndUpdate(
      { _id: req.params.spaceId, "availabilities._id": req.params.availId },
      { $pull: { availabilities: { _id: req.params.availId } } },
      { new: true },
    );
    if (!spaceResult) {
      return rep.status(404).send("Availability not found");
    }
    rep.send(spaceResult);
  } catch (error) {
    rep.status(500).send(error);
  }
}

async function removeSpace(req, rep) {
  try {
    const deletedSpace = await space.findByIdAndDelete(req.params.id);
    if (!deletedSpace) {
      return rep.status(404).send("Space not found");
    }
    rep.status(203).send("");
  } catch (error) {
    rep.status(500).send(error);
  }
}

async function addImage(req, rep) {
  try {
    const spaceResult = await space.findById(req.params.id);
    if (!spaceResult) {
      return rep.status(404).send("Space not found");
    }
    spaceResult.images.push(req.body);
    const updatedSpace = await spaceResult.save();
    rep.send(updatedSpace);
  } catch (err) {
    rep.status(500).send(err);
  }
}

async function updateImage(req, rep) {
  try {
    const spaceResult = await space.findById(req.params.spaceId);
    if (!spaceResult) {
      return rep.status(404).send("Space not found");
    }
    const imageIdCasted = new mongoose.Types.ObjectId(req.params.imageId);
    const indexToUpdate = spaceResult.images.findIndex((image) =>
      image._id.equals(imageIdCasted),
    );
    if (indexToUpdate === -1) {
      return rep.status(404).send("Image not found");
    }
    spaceResult.images[indexToUpdate] = Object.assign(
      spaceResult.images[indexToUpdate],
      req.body,
    );
    const updatedSpace = await spaceResult.save();
    rep.send(updatedSpace);
  } catch (error) {
    rep.status(500).send(error);
  }
}

async function removeImage(req, rep) {
  try {
    const spaceResult = await space.findOneAndUpdate(
      { _id: req.params.spaceId, "images._id": req.params.imageId },
      { $pull: { images: { _id: req.params.imageId } } },
      { new: true },
    );
    if (!spaceResult) {
      return rep.status(404).send("Image not found");
    }
    rep.send(spaceResult);
  } catch (error) {
    rep.status(500).send(error);
  }
}

module.exports = {
  getSpaces,
  getSpace,
  addSpace,
  updateSpace,
  removeSpace,
  addAvailability,
  updateAvailability,
  removeAvailability,
  addImage,
  removeImage,
  updateImage,
};
