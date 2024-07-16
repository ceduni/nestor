require("dotenv").config();
const mongoose = require("mongoose");
const reservation = require("../src/models/reservation.model");
const currentDate = new Date();

const sampleReservations = [
  {
    host: new mongoose.Types.ObjectId("60fda9be7d78562f5836c3a2"),
    createdAt: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      14,
      0,
      0,
    ),
    availability: new mongoose.Types.ObjectId("6688cb2c1b6cba9cf0ec5290"),
    guests: [
      new mongoose.Types.ObjectId("60fda9be7d78562f5836c3a1"),
      new mongoose.Types.ObjectId("60fda9be7d78562f5836c3a2"),
      new mongoose.Types.ObjectId("60fda9be7d78562f5836c3a3"),
    ],
    activity:
      "Révision des concepts de base de la théorie des ensembles en Maths",
    status: "pending",
    isPrivate: false,
    spaceId: new mongoose.Types.ObjectId("6688cb2c1b6cba9cf0ec528b"),
  },
  {
    host: new mongoose.Types.ObjectId("60fda9be7d78562f5836c3a3"),
    createdAt: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      9,
      0,
      0,
    ),
    availability: new mongoose.Types.ObjectId("6688cb2c1b6cba9cf0ec52c3"),
    guests: [],
    activity:
      "Exploration des principes fondamentaux de la physique quantique à travers des expériences simples",
    status: "pending",
    isPrivate: true,
    spaceId: new mongoose.Types.ObjectId("6688cb2c1b6cba9cf0ec52bf"),
  },
  {
    host: new mongoose.Types.ObjectId("60fda9be7d78562f5836c3a4"),
    createdAt: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      14,
      0,
      0,
    ),
    availability: new mongoose.Types.ObjectId("6688cb2c1b6cba9cf0ec52c4"),
    guests: [
      new mongoose.Types.ObjectId("60fda9be7d78562f5836c2a1"),
      new mongoose.Types.ObjectId("60fda9be7d78562f5836c2a2"),
    ],
    activity:
      "Analyse approfondie des œuvres littéraires majeures du XXe siècle à travers des discussions en groupe",
    status: "pending",
    isPrivate: true,
    spaceId: new mongoose.Types.ObjectId("6688cb2c1b6cba9cf0ec52bf"),
  },
  {
    host: new mongoose.Types.ObjectId("60fda9be7d78562f5836c3a5"),
    createdAt: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      12,
      0,
      0,
    ),
    availability: new mongoose.Types.ObjectId("6688cb2c1b6cba9cf0ec52a5"),
    guests: [],
    activity:
      "Développement de compétences avancées en langues étrangères par le biais de conversations structurées et d'exercices de grammaire",
    status: "pending",
    isPrivate: false,
    spaceId: new mongoose.Types.ObjectId("6688cb2c1b6cba9cf0ec52a0"),
  },
  {
    host: new mongoose.Types.ObjectId("60fda9be7d78562f5836c3a6"),
    createdAt: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      10,
      0,
      0,
    ),
    availability: new mongoose.Types.ObjectId("6688cb2c1b6cba9cf0ec5288"),
    guests: [],
    activity:
      "Exploration des innovations récentes en biotechnologie à travers des études de cas et des démonstrations pratiques",
    status: "pending",
    isPrivate: false,
    spaceId: new mongoose.Types.ObjectId("6688cb2c1b6cba9cf0ec5284"),
  },
];

mongoose.set("debug", true);
mongoose
  .connect(process.env.MONGODB_CLOUD_CONNECTION_STRING, {})
  .then(() => console.log("Connected to the database"))
  .catch((e) => console.log("Error connecting to database", e));

const seedSampleReservations = async () => {
  try {
    await reservation.insertMany(sampleReservations).then(() => {
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
};

seedSampleReservations();
