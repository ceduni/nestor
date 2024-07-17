const spaceSchema = {
  $id: "spaceSchema",
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        library: { type: "string" },
        street: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
        postalCode: { type: "string" },
        capacity: { type: "number" },
        isAvailable: { type: "boolean" },
        description: { type: "string" },
        organisation: { type: "string" },
        images: {
          type: "array",
          minItems: 1,
          items: {
            $id: "imageSchema",
            type: "object",
            minProperties: 1,
            additionalProperties: false,
            properties: {
              url: { type: "string" },
              isMain: { type: "boolean" },
            },
          },
        },
        availabilities: {
          type: "array",
          minItems: 1,
          items: {
            $id: "availabilitySchema",
            type: "object",
            additionalProperties: false,
            minProperties: 1,
            properties: {
              isPeriodic: { type: "boolean" },
              startAt: { type: "string" },
              endAt: { type: "string" },
            },
          },
        },
        features: {
          type: "array",
          items: {
            type: "string",
            enum: [
              "wifi",
              "screen",
              "plug",
              "projector",
              "noise cancelling",
              "whiteboard",
              "accessible",
            ],
          },
        },
        type: {
          type: "string",
          enum: [
            "university",
            "library",
            "facility",
            "nature",
            "coffee",
            "laboratory",
            "studyRoom",
          ],
        },
      },
      additionalProperties: false,
      minProperties: 1,
    },
  },
};

module.exports = spaceSchema;
