
const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  periodic: {
    type: Boolean,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
});

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  library: {
    type: String
  },
  address: {
    type: String,
    require: true
  },
  capacity: {
    type: Number,
    min: 1,
    require: true
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  organisation: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    enum: ["wifi", "écran", "prise", "projecteur", "imprimante", "réduction de bruit", "tableau blanc", "mur inscriptible", "accessible"]
  },
  availabilities: [availabilitySchema],
  type: {
    type: String,
    enum: ["studyRoom", "facility", "coffee", "park"]
  }
});

module.exports = spaceSchema;
