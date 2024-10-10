import { space } from "../models/space.model";
import mongoose from "mongoose";
import "dotenv/config";
const mongodb_connection_string =
  process.env.MONGODB_CLOUD_CONNECTION_STRING ?? "";
const spaceMockData = [
  {
    id: "64e1f6c5e72f92d3b4e12d0a",
    name: "Salle de Séminaire Université",
    library: "Bibliothèque Universitaire",
    streetNumber: "201",
    streetName: "Avenue des Étudiants",
    city: "Académia",
    state: "CA",
    postalCode: "90001",
    country: "USA",
    capacity: 80,
    isAvailable: true,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d0b",
        url: "https://example.com/images/espace-016-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d0c",
        url: "https://example.com/images/espace-016-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d0d",
        startAt: "2024-09-20T09:00:00Z",
        endAt: "2024-09-20T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d0e",
        startAt: "2024-09-21T09:00:00Z",
        endAt: "2024-09-21T17:00:00Z",
      },
    ],
    description:
      "Grande salle de séminaire pour les événements académiques, équipée de toutes les commodités nécessaires.",
    organisation: "Événements Académiques",
    features: ["wifi", "projector", "whiteboard"],
    type: ["university"],
    createdAt: "2024-07-01T09:00:00Z",
    updatedAt: "2024-08-25T10:00:00Z",
  },
  {
    id: "64e1f6c5e72f92d3b4e12d0f",
    name: "Salle de Collaboration Bibliothèque",
    library: "Bibliothèque Centrale",
    streetNumber: "305",
    streetName: "Boulevard des Livres",
    city: "Grandville",
    state: "IL",
    postalCode: "60601",
    country: "USA",
    capacity: 40,
    isAvailable: true,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d10",
        url: "https://example.com/images/espace-017-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d11",
        url: "https://example.com/images/espace-017-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d12",
        startAt: "2024-09-22T09:00:00Z",
        endAt: "2024-09-22T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d13",
        startAt: "2024-09-23T09:00:00Z",
        endAt: "2024-09-23T17:00:00Z",
      },
    ],
    description:
      "Salle de collaboration au sein de la bibliothèque, idéale pour les groupes d'étude et les projets communs.",
    organisation: "Collaboration Grandville",
    features: ["wifi", "whiteboard", "screen"],
    type: ["library", "studyRoom"],
    createdAt: "2024-07-15T10:00:00Z",
    updatedAt: "2024-08-25T11:00:00Z",
  },
  {
    id: "64e1f6c5e72f92d3b4e12d14",
    name: "Salle de Formation Technique",
    library: "Bibliothèque Technique",
    streetNumber: "221",
    streetName: "Rue des Innovateurs",
    city: "Techville",
    state: "TX",
    postalCode: "75001",
    country: "USA",
    capacity: 50,
    isAvailable: true,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d15",
        url: "https://example.com/images/espace-018-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d16",
        url: "https://example.com/images/espace-018-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d17",
        startAt: "2024-09-24T09:00:00Z",
        endAt: "2024-09-24T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d18",
        startAt: "2024-09-25T09:00:00Z",
        endAt: "2024-09-25T17:00:00Z",
      },
    ],
    description:
      "Salle de formation avec équipements spécialisés pour des ateliers techniques et des démonstrations.",
    organisation: "Formation Techville",
    features: ["wifi", "projector", "plug"],
    type: ["library"],
    createdAt: "2024-07-20T11:00:00Z",
    updatedAt: "2024-08-25T12:00:00Z",
  },
  {
    id: "64e1f6c5e72f92d3b4e12d19",
    name: "Salle de Séminaire et Réunion",
    library: "Bibliothèque Régionale",
    streetNumber: "118",
    streetName: "Boulevard des Séminaires",
    city: "Espaceville",
    state: "FL",
    postalCode: "33101",
    country: "USA",
    capacity: 70,
    isAvailable: true,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d1a",
        url: "https://example.com/images/espace-019-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d1b",
        url: "https://example.com/images/espace-019-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d1c",
        startAt: "2024-09-26T09:00:00Z",
        endAt: "2024-09-26T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d1d",
        startAt: "2024-09-27T09:00:00Z",
        endAt: "2024-09-27T17:00:00Z",
      },
    ],
    description:
      "Salle polyvalente pour séminaires et réunions, équipée pour des événements professionnels variés.",
    organisation: "Événements Espaceville",
    features: ["wifi", "projector", "whiteboard"],
    type: ["library"],
    createdAt: "2024-08-01T09:00:00Z",
    updatedAt: "2024-08-25T13:00:00Z",
  },
  {
    id: "64e1f6c5e72f92d3b4e12d1e",
    name: "Salle de Réunion Intégrée",
    library: "Bibliothèque Intégrée",
    streetNumber: "77",
    streetName: "Avenue des Réunions",
    city: "Metropolis",
    state: "OH",
    postalCode: "44101",
    country: "USA",
    capacity: 30,
    isAvailable: false,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d1f",
        url: "https://example.com/images/espace-020-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d20",
        url: "https://example.com/images/espace-020-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d21",
        startAt: "2024-09-28T09:00:00Z",
        endAt: "2024-09-28T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d22",
        startAt: "2024-09-29T09:00:00Z",
        endAt: "2024-09-29T17:00:00Z",
      },
    ],
    description:
      "Salle de réunion avec équipement complet pour des discussions importantes et des sessions de brainstorming.",
    organisation: "Réunions Intégrées",
    features: ["wifi", "whiteboard", "screen"],
    type: ["library", "studyRoom"],
    createdAt: "2024-08-05T10:00:00Z",
    updatedAt: "2024-08-25T14:00:00Z",
  },
  {
    id: "64e1f6c5e72f92d3b4e12d23",
    name: "Salle de Formation et Atelier",
    library: "Bibliothèque de Formation",
    streetNumber: "58",
    streetName: "Rue des Ateliers",
    city: "Innova City",
    state: "GA",
    postalCode: "30301",
    country: "USA",
    capacity: 65,
    isAvailable: true,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d24",
        url: "https://example.com/images/espace-021-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d25",
        url: "https://example.com/images/espace-021-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d26",
        startAt: "2024-09-30T09:00:00Z",
        endAt: "2024-09-30T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d27",
        startAt: "2024-10-01T09:00:00Z",
        endAt: "2024-10-01T17:00:00Z",
      },
    ],
    description:
      "Salle de formation et atelier pour des sessions pratiques et des formations techniques.",
    organisation: "Ateliers Innova",
    features: ["wifi", "projector", "plug"],
    type: ["library"],
    createdAt: "2024-08-15T11:00:00Z",
    updatedAt: "2024-08-25T15:00:00Z",
  },
  {
    id: "64e1f6c5e72f92d3b4e12d28",
    name: "Salle de Réunion Privée",
    library: "Bibliothèque Privée",
    streetNumber: "44",
    streetName: "Avenue de la Privacité",
    city: "Secret Town",
    state: "MI",
    postalCode: "48201",
    country: "USA",
    capacity: 20,
    isAvailable: true,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d29",
        url: "https://example.com/images/espace-022-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d2a",
        url: "https://example.com/images/espace-022-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d2b",
        startAt: "2024-10-02T09:00:00Z",
        endAt: "2024-10-02T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d2c",
        startAt: "2024-10-03T09:00:00Z",
        endAt: "2024-10-03T17:00:00Z",
      },
    ],
    description:
      "Salle de réunion privée pour des discussions confidentielles et des réunions de petite taille.",
    organisation: "Réunions Privées",
    features: ["wifi", "whiteboard", "accessible"],
    type: ["library", "studyRoom"],
    createdAt: "2024-08-20T12:00:00Z",
    updatedAt: "2024-08-25T16:00:00Z",
  },
  {
    id: "64e1f6c5e72f92d3b4e12d2d",
    name: "Salle de Présentation et Conférence",
    library: "Bibliothèque de Présentation",
    streetNumber: "90",
    streetName: "Boulevard des Conférences",
    city: "Event City",
    state: "WA",
    postalCode: "98001",
    country: "USA",
    capacity: 90,
    isAvailable: true,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d2e",
        url: "https://example.com/images/espace-023-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d2f",
        url: "https://example.com/images/espace-023-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d30",
        startAt: "2024-10-04T09:00:00Z",
        endAt: "2024-10-04T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d31",
        startAt: "2024-10-05T09:00:00Z",
        endAt: "2024-10-05T17:00:00Z",
      },
    ],
    description:
      "Grande salle de présentation et conférence avec équipement de pointe pour des événements de grande envergure.",
    organisation: "Conférences Event City",
    features: ["wifi", "projector", "noise cancelling"],
    type: ["library", "facility"],
    createdAt: "2024-08-10T13:00:00Z",
    updatedAt: "2024-08-25T17:00:00Z",
  },
  {
    id: "64e1f6c5e72f92d3b4e12d32",
    name: "Salle de Séminaire Technique",
    library: "Bibliothèque Technique",
    streetNumber: "133",
    streetName: "Avenue des Spécialistes",
    city: "Innovacity",
    state: "OR",
    postalCode: "97201",
    country: "USA",
    capacity: 45,
    isAvailable: true,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d33",
        url: "https://example.com/images/espace-024-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d34",
        url: "https://example.com/images/espace-024-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d35",
        startAt: "2024-10-06T09:00:00Z",
        endAt: "2024-10-06T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d36",
        startAt: "2024-10-07T09:00:00Z",
        endAt: "2024-10-07T17:00:00Z",
      },
    ],
    description:
      "Salle spécialisée pour des séminaires techniques, équipée pour des présentations complexes.",
    organisation: "Tech Innovacity",
    features: ["wifi", "projector", "plug"],
    type: ["library"],
    createdAt: "2024-08-05T14:00:00Z",
    updatedAt: "2024-08-25T18:00:00Z",
  },
  {
    id: "64e1f6c5e72f92d3b4e12d37",
    name: "Salle de Formation et Étude",
    library: "Bibliothèque d'Étude",
    streetNumber: "56",
    streetName: "Rue des Formations",
    city: "Learnville",
    state: "PA",
    postalCode: "19101",
    country: "USA",
    capacity: 35,
    isAvailable: true,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d38",
        url: "https://example.com/images/espace-025-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d39",
        url: "https://example.com/images/espace-025-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d3a",
        startAt: "2024-10-08T09:00:00Z",
        endAt: "2024-10-08T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d3b",
        startAt: "2024-10-09T09:00:00Z",
        endAt: "2024-10-09T17:00:00Z",
      },
    ],
    description:
      "Salle de formation et d'étude, idéale pour les groupes d'étude et les sessions de formation.",
    organisation: "Formation Learnville",
    features: ["wifi", "whiteboard", "screen"],
    type: ["library", "studyRoom"],
    createdAt: "2024-08-12T15:00:00Z",
    updatedAt: "2024-08-25T19:00:00Z",
  },
  {
    id: "64e1f6c5e72f92d3b4e12d3c",
    name: "Salle de Réunion de Travail",
    library: "Bibliothèque de Travail",
    streetNumber: "88",
    streetName: "Avenue des Travailleurs",
    city: "Business City",
    state: "NJ",
    postalCode: "07001",
    country: "USA",
    capacity: 25,
    isAvailable: true,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d3d",
        url: "https://example.com/images/espace-026-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d3e",
        url: "https://example.com/images/espace-026-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d3f",
        startAt: "2024-10-10T09:00:00Z",
        endAt: "2024-10-10T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d40",
        startAt: "2024-10-11T09:00:00Z",
        endAt: "2024-10-11T17:00:00Z",
      },
    ],
    description:
      "Salle de réunion de travail avec équipement pour des discussions de groupe et des sessions de brainstorming.",
    organisation: "Réunions Business",
    features: ["wifi", "whiteboard", "accessible"],
    type: ["library", "studyRoom"],
    createdAt: "2024-08-18T16:00:00Z",
    updatedAt: "2024-08-25T20:00:00Z",
  },
  {
    id: "64e1f6c5e72f92d3b4e12d41",
    name: "Salle de Réunion et Conférence",
    library: "Bibliothèque des Conférences",
    streetNumber: "123",
    streetName: "Boulevard des Réunions",
    city: "Conference City",
    state: "NC",
    postalCode: "27501",
    country: "USA",
    capacity: 85,
    isAvailable: true,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d42",
        url: "https://example.com/images/espace-027-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d43",
        url: "https://example.com/images/espace-027-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d44",
        startAt: "2024-10-12T09:00:00Z",
        endAt: "2024-10-12T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d45",
        startAt: "2024-10-13T09:00:00Z",
        endAt: "2024-10-13T17:00:00Z",
      },
    ],
    description:
      "Salle de réunion et de conférence, équipée pour des événements de grande taille avec tout le nécessaire.",
    organisation: "Conférences City",
    features: ["wifi", "projector", "noise cancelling"],
    type: ["library", "facility"],
    createdAt: "2024-08-22T17:00:00Z",
    updatedAt: "2024-08-25T21:00:00Z",
  },
  {
    id: "64e1f6c5e72f92d3b4e12d46",
    name: "Salle de Présentation Éclairée",
    library: "Bibliothèque de Présentation",
    streetNumber: "151",
    streetName: "Avenue des Présentations",
    city: "Showtown",
    state: "CO",
    postalCode: "80201",
    country: "USA",
    capacity: 60,
    isAvailable: true,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d47",
        url: "https://example.com/images/espace-028-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d48",
        url: "https://example.com/images/espace-028-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d49",
        startAt: "2024-10-14T09:00:00Z",
        endAt: "2024-10-14T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d4a",
        startAt: "2024-10-15T09:00:00Z",
        endAt: "2024-10-15T17:00:00Z",
      },
    ],
    description:
      "Salle de présentation bien éclairée, idéale pour des événements visuels et des démonstrations.",
    organisation: "Showtown Présentations",
    features: ["wifi", "screen", "noise cancelling"],
    type: ["library"],
    createdAt: "2024-08-25T18:00:00Z",
    updatedAt: "2024-08-25T22:00:00Z",
  },
  {
    id: "64e1f6c5e72f92d3b4e12d4b",
    name: "Salle de Réunion Modulaire",
    library: "Bibliothèque Modulaire",
    streetNumber: "29",
    streetName: "Boulevard des Réunions Modulaire",
    city: "Flex City",
    state: "TN",
    postalCode: "37201",
    country: "USA",
    capacity: 50,
    isAvailable: true,
    images: [
      {
        id: "64e1f6c5e72f92d3b4e12d4c",
        url: "https://example.com/images/espace-029-main.jpg",
        isMain: true,
      },
      {
        id: "64e1f6c5e72f92d3b4e12d4d",
        url: "https://example.com/images/espace-029-1.jpg",
        isMain: false,
      },
    ],
    availabilities: [
      {
        id: "64e1f6c5e72f92d3b4e12d4e",
        startAt: "2024-10-16T09:00:00Z",
        endAt: "2024-10-16T17:00:00Z",
      },
      {
        id: "64e1f6c5e72f92d3b4e12d4f",
        startAt: "2024-10-17T09:00:00Z",
        endAt: "2024-10-17T17:00:00Z",
      },
    ],
    description:
      "Salle modulaire pour des réunions et des événements flexibles avec une capacité ajustable.",
    organisation: "Flex City Réunions",
    features: ["wifi", "whiteboard", "projector"],
    type: ["library"],
    createdAt: "2024-08-10T16:00:00Z",
    updatedAt: "2024-08-25T23:00:00Z",
  },
];

mongoose
  .connect(mongodb_connection_string)
  .then(async () => {
    try {
      await space.insertMany(spaceMockData);
      await space.updateMany({}, [
        {
          $set: {
            fullAddress: {
              $concat: [
                "$streetNumber",
                " ",
                "$streetName",
                ", ",
                "$city",
                ", ",
                "$state",
                ", ",
                "$country",
              ],
            },
          },
        },
      ]);
    } catch (e) {
      console.log(e);
    } finally {
      await mongoose.connection.close();
    }
  })
  .catch((error) => console.log(error));
