const mongoose = require("mongoose");

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
  availabilities: [{ type: mongoose.Schema.Types.ObjectId, ref: "availability" }],
  type: {
    type: String,
    enum: ["studyRoom", "facility", "coffee", "park"]
  }
});

const availabilityConstraintOnSave = (avail, next) => {

  //console.log()
  //const size = avail.length;

  //for (let i = 0; i < size; i++) {
  // for (let j = i + 1; j < size; j++) {
  //   const startAtA = avail[j].startAt;
  // const endAtA = avail[j].endAt;
  //const startAtB = avail[i].startAt;
  //const endAtB = avail[i].endAt;
  //if (endAtA.getTime() > startAtB.getTime() && startAtA < endAtB) {
  // next(new Error("Two availabilities cannot overlap"));
  //}
  // }
  //}

}

spaceSchema.pre("save", function(next) {
  availabilityConstraintOnSave(this.availabilities, next);
  next();
})

const space = mongoose.model("space", spaceSchema);

module.exports = space;
