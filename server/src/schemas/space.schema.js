const spaceSchema = {
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
                    items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            url: { type: "string" }
                        }
                    }
                },
                availabilities: {
                    type: "array",
                    items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            isPeriodic: { type: "boolean" },
                            startAt: { type: "string" },
                            endAt: { type: "string" }
                        }
                    }
                },
                features: {
                    type: "array",
                    items: {
                        type: "string",
                        enum: ["wifi", "screen", "plug", "projector", "noise cancelling", "whiteboard", "accessible"]
                    }
                },
                type: {
                    type: "string",
                    enum: ["studyRoom", "facility", "nature"]
                }
            },
            additionalProperties: false
        },
        params: {
            type: "object",
            additionalProperties: false,
            properties: {
                id: { type: "string" },
                spaceId: { type: "string" },
                availId: { type: "string" },
                imageId: { type: "string" }
            }
        }
    }
};

module.exports = spaceSchema;
