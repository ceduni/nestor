import {space} from "../models/space.model";
import mongoose from "mongoose";
import "dotenv/config";
const mongodb_connection_string =
    process.env.MONGODB_DEV_CONNECTION_STRING ?? "";
const spaceMockData = [
    {
        "id": "64e1f6c5e72f92d3b4e12c7a",
        "name": "Salle de Conférence Centre-Ville",
        "library": "Bibliothèque Centrale",
        "streetNumber": "123",
        "streetName": "Rue Principale",
        "city": "Métropole",
        "state": "NY",
        "postalCode": "10001",
        "country": "USA",
        "capacity": 50,
        "isAvailable": true,
        "images": [
            {
                "id": "64e1f6c5e72f92d3b4e12c7b",
                "url": "https://example.com/images/espace-001-main.jpg",
                "isMain": true
            },
            {
                "id": "64e1f6c5e72f92d3b4e12c7c",
                "url": "https://example.com/images/espace-001-1.jpg",
                "isMain": false
            }
        ],
        "availabilities": [
            {
                "id": "64e1f6c5e72f92d3b4e12c7d",
                "startAt": "2024-08-20T09:00:00Z",
                "endAt": "2024-08-20T17:00:00Z"
            },
            {
                "id": "64e1f6c5e72f92d3b4e12c7e",
                "startAt": "2024-08-21T09:00:00Z",
                "endAt": "2024-08-21T17:00:00Z"
            }
        ],
        "description": "Une salle de conférence spacieuse et moderne située au cœur de la ville, idéale pour des réunions et des séminaires.",
        "organisation": "Événements Métropole",
        "features": ["wifi", "projector", "whiteboard"],
        "type": ["library", "studyRoom"],
        "createdAt": "2024-01-15T08:30:00Z",
        "updatedAt": "2024-08-01T10:00:00Z"
    },
    {
        "id": "64e1f6c5e72f92d3b4e12c7f",
        "name": "Studio Urbain",
        "library": "Studio de la Ville",
        "streetNumber": "456",
        "streetName": "Rue Elm",
        "city": "Métropole",
        "state": "NY",
        "country": "USA",
        "postalCode": "10002",
        "capacity": 20,
        "isAvailable": false,
        "images": [
            {
                "id": "64e1f6c5e72f92d3b4e12c80",
                "url": "https://example.com/images/espace-002-main.jpg",
                "isMain": true
            },
            {
                "id": "64e1f6c5e72f92d3b4e12c81",
                "url": "https://example.com/images/espace-002-1.jpg",
                "isMain": false
            }
        ],
        "availabilities": [
            {
                "id": "64e1f6c5e72f92d3b4e12c82",
                "startAt": "2024-08-22T09:00:00Z",
                "endAt": "2024-08-22T17:00:00Z"
            }
        ],
        "description": "Un studio confortable, parfait pour des ateliers et des réunions en petit comité.",
        "organisation": "Arts de la Ville",
        "features": ["wifi", "screen", "plug"],
        "type": ["coffee", "studyRoom"],
        "createdAt": "2024-02-10T09:00:00Z",
        "updatedAt": "2024-08-01T10:00:00Z"
    },
    {
        "id": "64e1f6c5e72f92d3b4e12c83",
        "name": "Salle de Réunion Universitaire",
        "library": "Université de Métropole",
        "streetNumber": "789",
        "streetName": "Rue Université",
        "city": "Métropole",
        "state": "NY",
        "country": "USA",
        "postalCode": "10003",
        "capacity": 30,
        "isAvailable": true,
        "images": [
            {
                "id": "64e1f6c5e72f92d3b4e12c84",
                "url": "https://example.com/images/espace-003-main.jpg",
                "isMain": true
            }
        ],
        "availabilities": [
            {
                "id": "64e1f6c5e72f92d3b4e12c85",
                "startAt": "2024-09-01T09:00:00Z",
                "endAt": "2024-09-01T17:00:00Z"
            }
        ],
        "description": "Salle de réunion avec équipement moderne et vue sur le campus universitaire.",
        "organisation": "Université de Métropole",
        "features": ["wifi", "projector", "whiteboard"],
        "type": ["university", "studyRoom"],
        "createdAt": "2024-03-15T08:30:00Z",
        "updatedAt": "2024-08-01T10:00:00Z"
    },
    {
        "id": "64e1f6c5e72f92d3b4e12c86",
        "name": "Espace Café de Travail",
        "library": "Café Créatif",
        "streetNumber": "321",
        "streetName": "Rue Café",
        "city": "Métropole",
        "state": "NY",
        "country": "USA",
        "postalCode": "10004",
        "capacity": 15,
        "isAvailable": true,
        "images": [
            {
                "id": "64e1f6c5e72f92d3b4e12c87",
                "url": "https://example.com/images/espace-004-main.jpg",
                "isMain": true
            }
        ],
        "availabilities": [
            {
                "id": "64e1f6c5e72f92d3b4e12c88",
                "startAt": "2024-09-05T09:00:00Z",
                "endAt": "2024-09-05T17:00:00Z"
            }
        ],
        "description": "Un espace confortable et informel, idéal pour travailler en prenant un café.",
        "organisation": "Café Créatif",
        "features": ["wifi", "plug", "screen"],
        "type": ["coffee", "studyRoom"],
        "createdAt": "2024-04-10T09:00:00Z",
        "updatedAt": "2024-08-01T10:00:00Z"
    },
    {
        "id": "64e1f6c5e72f92d3b4e12c89",
        "name": "Laboratoire de Recherche",
        "library": "Laboratoire Scientifique",
        "streetNumber": "654",
        "streetName": "Avenue Recherche",
        "city": "Laval",
        "state": "QC",
        "country": "USA",
        "postalCode": "10005",
        "capacity": 25,
        "isAvailable": false,
        "images": [
            {
                "id": "64e1f6c5e72f92d3b4e12c8a",
                "url": "https://example.com/images/espace-005-main.jpg",
                "isMain": true
            }
        ],
        "availabilities": [
            {
                "id": "64e1f6c5e72f92d3b4e12c8b",
                "startAt": "2024-09-10T09:00:00Z",
                "endAt": "2024-09-10T17:00:00Z"
            }
        ],
        "description": "Laboratoire équipé pour les expériences scientifiques et la recherche.",
        "organisation": "Laboratoire Scientifique",
        "features": ["wifi", "projector", "whiteboard", "plug"],
        "type": ["laboratory"],
        "createdAt": "2024-05-20T09:00:00Z",
        "updatedAt": "2024-08-01T10:00:00Z"
    },
    {
        "id": "64e1f6c5e72f92d3b4e12c8c",
        "name": "Espace Nature en Plein Air",
        "library": "Parc Métropolitain",
        "streetNumber": "987",
        "streetName": "Rue Nature",
        "city": "Métropole",
        "state": "NY",
        "country": "USA",
        "postalCode": "10006",
        "capacity": 10,
        "isAvailable": true,
        "images": [
            {
                "id": "64e1f6c5e72f92d3b4e12c8d",
                "url": "https://example.com/images/espace-006-main.jpg",
                "isMain": true
            }
        ],
        "availabilities": [
            {
                "id": "64e1f6c5e72f92d3b4e12c8e",
                "startAt": "2024-09-15T09:00:00Z",
                "endAt": "2024-09-15T17:00:00Z"
            }
        ],
        "description": "Un espace en plein air pour des activités en nature et des événements en extérieur.",
        "organisation": "Parc Métropolitain",
        "features": ["wifi", "screen"],
        "type": ["nature", "studyRoom"],
        "createdAt": "2024-06-25T09:00:00Z",
        "updatedAt": "2024-08-01T10:00:00Z"
    }
];

mongoose.connect(mongodb_connection_string).then(async ()=>{
    try {
        await space.insertMany(spaceMockData);
    } catch (e) {
        console.log(e);
    }
    finally {
        await mongoose.connection.close();
    }
}).catch((error) => console.log(error));

