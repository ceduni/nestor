const space = require("../src/models/space.model");
require("dotenv").config();

const currentDate = new Date();
const mongoose = require("mongoose");

const sampleSpaces = [
  {
    name: "Campus de Laval",
    street: "2920 Ch de la Tour",
    city: "Montréal",
    state: "QC",
    postalCode: "H3T 1N8",
    capacity: 8,
    status: true,
    image: "test",
    description: "La salle d'étude est un espace calme et bien équipé, idéal pour travailler ou étudier seul(e) ou en groupe.Elle peut être réservée pour des séances d'étude privées ou des réunions académiques.",
    organisation: "Université de Montréal",
    features: ["écran", "tableau blanc", "prise"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 20, 0, 0)
      }
    ]
  },
  {
    name: "Média 5438",
    library: "Bibliothèque de droit",
    street: "3101 Ch de la Tour",
    city: "Montréal",
    state: "QC",
    postalCode: "H3T 1J7",
    capacity: 6,
    status: true,
    image: "test",
    description: "Espace de travail confortable avec accès à la bibliothèque de droit. Idéal pour des sessions d'étude concentrée ou des réunions académiques.",
    organisation: "Université de Montréal",
    features: ["écran", "prise"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 11, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
      }
    ]
  },
  {
    name: "A-0708",
    library: "Bibliothèque des Sciences",
    street: "1375 Ave.Thérèse-Lavoie-Roux",
    city: "Montréal",
    state: "QC",
    postalCode: "H2V 0B3",
    capacity: 8,
    status: true,
    image: "test",
    description: "Espace moderne équipé d'un mur inscriptible. Parfait pour les séances de brainstorming ou les études en groupe.",
    organisation: "Université de Montréal",
    features: ["écran", "mur inscriptible"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 11, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 20, 0, 0)
      }
    ]
  },
  {
    name: "HSSL - Cyberthèque Pod 1",
    library: "Bibliothèque de McGill",
    street: "Redpath Hall, 3461 McTavish St",
    city: "Montréal",
    state: "QC",
    postalCode: "H3A 1Y1",
    capacity: 10,
    status: true,
    image: "test",
    description: "Salle de lecture silencieuse. Lieu idéal pour l'étude individuelle ou en petit groupe.",
    organisation: "Université de McGill",
    features: ["prise"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 11, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0)
      }
    ]
  },
  {
    name: "LB 251 - Linda Kay",
    library: "Bibliothèque Webster",
    street: "Pavillion J.W. McConnell Bldg, 1400 Maisonneuve Blvd W",
    city: "Montréal",
    state: "QC",
    postalCode: "H3G 1M8",
    capacity: 6,
    status: true,
    image: "test",
    description: "Espace tranquille idéal pour les sessions de travail nécessitant concentration et inspiration.",
    organisation: "Université de McGill",
    features: ["prise", "accessible"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
      }
    ]
  },
  {
    name: "Salle croissance 25",
    street: "Le Hub 288 288 boul. Curé-Labelle",
    city: "Laval",
    state: "QC",
    postalCode: "H7P 2P1",
    capacity: 14,
    status: true,
    image: "test",
    description: "Salle de travail spacieuse avec ambiance détendue. Équipée pour des études individuelles ou en groupe dans un environnement confortable.",
    organisation: "Association de location de salles du Québec",
    features: ["prise", "écran"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 20, 0, 0)
      }
    ]
  },
  {
    name: "Aggrandissement",
    street: "L'Entraide Pont-Viaurue St-André",
    city: "Laval",
    state: "QC",
    postalCode: "H7G 3A5",
    capacity: 110,
    status: true,
    image: "test",
    description: "Espace polyvalent adapté pour des événements de grande envergure ou des sessions de formation. Confortablement aménagé.",
    organisation: "Association de location de salles du Québec",
    features: ["prise"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
      }
    ]
  },
  {
    name: "Montreal CoWork",
    street: "123 Rue Principale",
    city: "Montréal",
    state: "QC",
    postalCode: "H1A 2B3",
    capacity: 20,
    status: true,
    image: "test",
    description: "Espace de co-working moderne avec connexion Wi-Fi rapide et espaces de réunion. Parfait pour les freelancers et les petites équipes cherchant un environnement collaboratif.",
    organisation: "Montreal CoWork",
    features: ["wifi"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
      }
    ]
  },
  {
    name: "Centre d'Étude 101",
    street: "123 Rue de l'Étude",
    city: "Montréal",
    state: "QC",
    postalCode: "H1A 2B3",
    capacity: 12,
    status: true,
    image: "test",
    description: "Espace d'étude moderne équipé de mobilier ergonomique et d'internet haut débit. Idéal pour l'étude individuelle ou les discussions en petit groupe.",
    organisation: "Solutions d'Étude Inc.",
    features: ["prise", "wifi"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
      }
    ]
  },
  {
    name: "Coin Étude Tranquille",
    street: "456 Rue de la Paix",
    city: "Montréal",
    state: "QC",
    postalCode: "H2C 3D5",
    capacity: 5,
    status: true,
    image: "test",
    description: "Coin d'étude confortable et calme avec lumière naturelle. Parfait pour la lecture concentrée ou la contemplation individuelle.",
    organisation: "Espaces Paisibles Ltée.",
    features: ["tableau blanc", "prise"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 11, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0)
      }
    ]
  },
  {
    name: "Laboratoire d'Étude Technologique",
    street: "789 Avenue de l'Innovation",
    city: "Montréal",
    state: "QC",
    postalCode: "H3E 4F6",
    capacity: 20,
    status: true,
    image: "test",
    description: "Laboratoire d'étude de pointe avec technologie avancée et espaces de travail collaboratif. Idéal pour les projets de groupe ou les sessions d'étude axées sur la technologie.",
    organisation: "TechÉtude Inc.",
    features: ["tableau blanc", "prise"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
      }
    ]
  },
  {
    name: "Retraite d'Étude Silencieuse",
    street: "101 Chemin de la Sérénité",
    city: "Montréal",
    state: "QC",
    postalCode: "H4G 5K9",
    capacity: 10,
    status: true,
    image: "test",
    description: "Retraite d'étude tranquille entourée de nature. Idéal pour des sessions d'étude sans interruption ou pour la réflexion personnelle.",
    organisation: "Retraites Sérénité",
    features: ["tableau blanc", "prise"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17, 0, 0)
      }
    ]
  },
  {
    name: "Coin Étude Cosy",
    street: "222 Rue de la Bibliothèque",
    city: "Montréal",
    state: "QC",
    postalCode: "H5J 6M2",
    capacity: 8,
    status: true,
    image: "test",
    description: "Coin d'étude confortable avec une collection de livres de référence. Parfait pour la lecture détendue ou les sessions d'étude concentrées.",
    organisation: "Studios Livrovore",
    features: ["tableau blanc", "prise"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0)
      }
    ]
  },
  {
    name: "Bureau Étudiant Pro",
    street: "789 Avenue du Savoir",
    city: "Montréal",
    state: "QC",
    postalCode: "H2A 3B4",
    capacity: 15,
    status: true,
    image: "test",
    description: "Bureau d'étude professionnel avec équipements de pointe et ambiance studieuse. Idéal pour les étudiants cherchant un environnement sérieux et productif.",
    organisation: "Étude Professionnelle Inc.",
    features: ["tableau blanc", "prise"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
      }
    ]
  },
  {
    name: "Espace Étude Zen",
    street: "456 Rue de la Tranquillité",
    city: "Montréal",
    state: "QC",
    postalCode: "H3C 2E1",
    capacity: 6,
    status: true,
    image: "test",
    description: "Espace d'étude zen avec décor apaisant et musique relaxante. Parfait pour les étudiants recherchant une atmosphère calme et inspirante.",
    organisation: "Zen Étude Studios",
    features: ["tableau blanc", "prise"],
    availabilities: [
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0)
      },
      {
        startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0, 0),
        endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0)
      }
    ]
  }
];

mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_CLOUD_CONNECTION_STRING, {}).then(() => console.log("Connected to the database")).catch((e) => console.log("Error connecting to database", e));

const seedSampleSpaces = async () => {
  try {
    await space.insertMany(sampleSpaces).then(() => {
      mongoose.connection.close();
    })
  } catch (error) {
    console.log(error);
  }
}

seedSampleSpaces();

