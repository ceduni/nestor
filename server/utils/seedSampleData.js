require("dotenv").config();
const mongoose = require("mongoose");
const space = require("../src/models/space.model").space;
const currentDate = new Date();


const sampleSpaces = [
  {
    name: "Campus de Laval",
    street: "2920 Ch de la Tour",
    city: "Montreal",
    state: "QC",
    postalCode: "H3T 1N8",
    capacity: 8,
    isAvailable: true,
    images: [
      { url: "src/assets/images/udem_campus_laval_1.jpg"},
      { url: "src/assets/images/udem_campus_laval_2.jpg" },
      { url: "src/assets/images/udem_campus_laval_3.jpg" }
    ],
    description: "La salle d'étude est un espace calme et bien équipé, idéal pour travailler ou étudier seul(e) ou en groupe.Elle peut être réservée pour des séances d'étude privées ou des réunions académiques.",
    organisation: "Université de Montreal",
    features: ["screen", "whiteboard", "plug"],
    type: "studyRoom",
    availabilities: [
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0)
      },
      {
        isPeriodic: true,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 20, 0, 0)
      }
    ]
  },
  {
    name: "Média 5438",
    library: "Bibliothèque de droit",
    street: "3101 Ch de la Tour",
    city: "Montreal",
    state: "QC",
    postalCode: "H3T 1J7",
    capacity: 6,
    isAvailable: true,
    images: [
      { url: "src/assets/images/udem_biblio_droit_1.jpg" },
      { url: "src/assets/images/udem_biblio_droit_2.jpg" },
      { url: "src/assets/images/udem_biblio_droit_3.jpg" }
    ],
    description: "Espace de travail confortable avec accès à la bibliothèque de droit. Idéal pour des sessions d'étude concentrée ou des réunions académiques.",
    organisation: "Université de Montreal",
    features: ["screen", "plug"],
    type: "studyRoom",
    availabilities: [
      {
        isPeriodic: true,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 11, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0)
      },
      {
        isPeriodic: true,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
      }
    ]
  },
  {
    name: "A-0708",
    library: "Bibliothèque des Sciences",
    street: "1375 Ave.Thérèse-Lavoie-Roux",
    city: "Montreal",
    state: "QC",
    postalCode: "H2V 0B3",
    capacity: 8,
    isAvailable: true,
    images: [
      { url: "src/assets/images/udem_biblio_sciences_1.jpg" },
      { url: "src/assets/images/udem_biblio_sciences_2.jpg" },
      { url: "src/assets/images/udem_biblio_sciences_3.jpg" }
    ],
    description: "Espace moderne équipé d'un mur inscriptible. Parfait pour les séances de brainstorming ou les études en groupe.",
    organisation: "Université de Montreal",
    features: ["screen", "plug"],
    type: "studyRoom",
    availabilities: [
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 11, 0, 0)
      },
      {
        isPeriodic: true,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 20, 0, 0)
      }
    ]
  },
  {
    name: "HSSL - Cyberthèque Pod 1",
    library: "Bibliothèque de McGill",
    street: "Redpath Hall, 3461 McTavish St",
    city: "Montreal",
    state: "QC",
    postalCode: "H3A 1Y1",
    capacity: 10,
    isAvailable: true,
    images: [
      { url: "src/assets/images/biblio_mcgill_hssl_1.jpg" },
      { url: "src/assets/images/biblio_mcgill_hssl_2.jpg" },
      { url: "src/assets/images/biblio_mcgill_hssl_3.jpg" }
    ],
    description: "Salle de lecture silencieuse. Lieu idéal pour l'étude individuelle ou en petit groupe.",
    organisation: "Université de McGill",
    features: ["plug"],
    type: "studyRoom",
    availabilities: [
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 11, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0, 0)
      },
      {
        isPeriodic: true,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0)
      }
    ]
  },
  {
    name: "LB 251 - Linda Kay",
    library: "Bibliothèque Webster",
    street: "Pavillion J.W. McConnell Bldg, 1400 Maisonneuve Blvd W",
    city: "Montreal",
    state: "QC",
    postalCode: "H3G 1M8",
    capacity: 6,
    isAvailable: true,
    images: [
      { url: "src/assets/images/biblio_webster_1.jpg" },
      { url: "src/assets/images/biblio_webster_2.jpg" },
      { url: "src/assets/images/biblio_webster_3.jpg" }
    ],
    description: "Espace tranquille idéal pour les sessions de travail nécessitant concentration et inspiration.",
    organisation: "Université de McGill",
    features: ["plug", "accessible"],
    type: "studyRoom",
    availabilities: [
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0)
      },
      {
        isPeriodic: true,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
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
    isAvailable: true,
    images: [
      { url: "src/assets/images/salle_croissance_1.jpg" },
      { url: "src/assets/images/salle_croissance_2.jpg" },
      { url: "src/assets/images/salle_croissance_3.jpg" }
    ],
    description: "Salle de travail spacieuse avec ambiance détendue. Équipée pour des études individuelles ou en groupe dans un environnement confortable.",
    organisation: "Association de location de salles du Québec",
    features: ["plug", "screen"],
    type: "facility",
    availabilities: [
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 20, 0, 0)
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
    isAvailable: true,
    images: [
      { url: "src/assets/images/agrandissement-1.jpg" },
      { url: "src/assets/images/agrandissement-2.jpg" }
    ],
    description: "Espace polyvalent adapté pour des événements de grande envergure ou des sessions de formation. Confortablement aménagé.",
    organisation: "Association de location de salles du Québec",
    features: ["plug"],
    type: "facility",
    availabilities: [
      {
        isPeriodic: true,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0)
      },
      {
        isPeriodic: true,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
      }
    ]
  },
  {
    name: "Montreal CoWork",
    street: "123 Rue Principale",
    city: "Montreal",
    state: "QC",
    postalCode: "H1A 2B3",
    capacity: 20,
    isAvailable: true,
    images: [
      { url: "src/assets/images/montreal_cowork_1.jpg" },
      { url: "src/assets/images/montreal_cowork_2.jpg" },
      { url: "src/assets/images/montreal_cowork_3.jpg" }
    ],
    description: "Espace de co-working moderne avec connexion Wi-Fi rapide et espaces de réunion. Parfait pour les freelancers et les petites équipes cherchant un environnement collaboratif.",
    organisation: "Montreal CoWork",
    features: ["wifi"],
    type: "facility",
    availabilities: [
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
      }
    ]
  },
  {
    name: "Centre d'Étude 101",
    street: "123 Rue de l'Étude",
    city: "Montreal",
    state: "QC",
    postalCode: "H1A 2B3",
    capacity: 12,
    isAvailable: true,
    images: [
      { url: "src/assets/images/centre_etude_101_1.jpg" },
      { url: "src/assets/images/centre_etude_101_2.jpg" },
      { url: "src/assets/images/centre_etude_101_3.jpg" }
    ],
    description: "Espace d'étude moderne équipé de mobilier ergonomique et d'internet haut débit. Idéal pour l'étude individuelle ou les discussions en petit groupe.",
    organisation: "Solutions d'Étude Inc.",
    features: ["plug", "wifi"],
    type: "facility",
    availabilities: [
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0)
      },
      {
        isPeriodic: true,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
      }
    ]
  },
  {
    name: "Coin Étude Tranquille",
    street: "456 Rue de la Paix",
    city: "Montreal",
    state: "QC",
    postalCode: "H2C 3D5",
    capacity: 5,
    isAvailable: true,
    images: [
      { url: "src/assets/images/coin_etude_tranquille_1.jpg" },
      { url: "src/assets/images/coin_etude_tranquille_2.jpg" },
      { url: "src/assets/images/coin_etude_tranquille_3.jpg" }
    ],
    description: "Coin d'étude confortable et calme avec lumière naturelle. Parfait pour la lecture concentrée ou la contemplation individuelle.",
    organisation: "Espaces Paisibles Ltée.",
    features: ["whiteboard", "plug"],
    type: "facility",
    availabilities: [
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 11, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0)
      }
    ]
  },
  {
    name: "Laboratoire d'Étude Technologique",
    street: "789 Avenue de l'Innovation",
    city: "Montreal",
    state: "QC",
    postalCode: "H3E 4F6",
    capacity: 20,
    isAvailable: true,
    images: [
      { url: "src/assets/images/labo_etude_technologie_1.jpg" },
      { url: "src/assets/images/labo_etude_technologie_2.jpg" },
      { url: "src/assets/images/labo_etude_technologie_3.jpg" }
    ],
    description: "Laboratoire d'étude de pointe avec technologie avancée et espaces de travail collaboratif. Idéal pour les projets de groupe ou les sessions d'étude axées sur la technologie.",
    organisation: "TechÉtude Inc.",
    features: ["whiteboard", "plug"],
    type: "facility",
    availabilities: [
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
      }
    ]
  },
  {
    name: "Retraite d'Étude Silencieuse",
    street: "101 Chemin de la Sérénité",
    city: "Montreal",
    state: "QC",
    postalCode: "H4G 5K9",
    capacity: 10,
    isAvailable: true,
    images: [
      { url: "src/assets/images/retraite_etude_silencieuse_1.jpg" },
      { url: "src/assets/images/retraite_etude_silencieuse_2.jpg" }
    ],
    description: "Retraite d'étude tranquille entourée de nature. Idéal pour des sessions d'étude sans interruption ou pour la réflexion personnelle.",
    organisation: "Retraites Sérénité",
    features: ["whiteboard", "plug"],
    type: "facility",
    availabilities: [
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17, 0, 0)
      }
    ]
  },
  {
    name: "Coin Étude Cosy",
    street: "222 Rue de la Bibliothèque",
    city: "Montreal",
    state: "QC",
    postalCode: "H5J 6M2",
    capacity: 8,
    isAvailable: true,
    images: [
      { url: "src/assets/images/coin_etude_cosy_1.jpg" },
      { url: "src/assets/images/coin_etude_cosy_2.jpg" },
      { url: "src/assets/images/coin_etude_cosy_3.jpg" }
    ],
    description: "Coin d'étude confortable avec une collection de livres de référence. Parfait pour la lecture détendue ou les sessions d'étude concentrées.",
    organisation: "Studios Livrovore",
    features: ["whiteboard", "plug"],
    type: "facility",
    availabilities: [
      {
        isPeriodic: true,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0)
      },
      {
        isPeriodic: true,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0)
      }
    ]
  },
  {
    name: "Bureau Étudiant Pro",
    street: "789 Avenue du Savoir",
    city: "Montreal",
    state: "QC",
    postalCode: "H2A 3B4",
    capacity: 15,
    isAvailable: true,
    images: [
      { url: "src/assets/images/bureau_etudiant_pro_1.jpg" },
      { url: "src/assets/images/bureau_etudiant_pro_2.jpg" },
      { url: "src/assets/images/bureau_etudiant_pro_3.jpg" }
    ],
    description: "Bureau d'étude professionnel avec équipements de pointe et ambiance studieuse. Idéal pour les étudiants cherchant un environnement sérieux et productif.",
    organisation: "Étude Professionnelle Inc.",
    features: ["whiteboard", "plug"],
    type: "facility",
    availabilities: [
      {
        isPeriodic: true,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0)
      }
    ]
  },
  {
    name: "Espace Étude Zen",
    street: "456 Rue de la Tranquillité",
    city: "Montreal",
    state: "QC",
    postalCode: "H3C 2E1",
    capacity: 6,
    isAvailable: true,
    images: [
      { url: "src/assets/images/espace_etude_zen_1.jpg" },
      { url: "src/assets/images/espace_etude_zen_2.jpg" },
      { url: "src/assets/images/espace_etude_zen_3.jpg" }
    ],
    description: "Espace d'étude zen avec décor apaisant et musique relaxante. Parfait pour les étudiants recherchant une atmosphère calme et inspirante.",
    organisation: "Zen Étude Studios",
    features: ["whiteboard", "plug"],
    type: "facility",
    availabilities: [
      {
        isPeriodic: true,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0)
      },
      {
        isPeriodic: false,
        startAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0, 0),
        endAt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0)
      }
    ]
  }
];

mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_CLOUD_CONNECTION_STRING, {})
    .then(() => console.log("Connected to the database"))
    .catch((e) => console.log("Error connecting to database", e));

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

