const reservationSchema = {
  $id: "reservationSchema",
  schema: {
    body: {
      type: "object",
      properties: {
        host: { type: "string" },
        availability: {
          type: "object",
          additionalProperties: false,
          minProperties: 1,
          properties: {
            isPeriodic: { type: "boolean" },
            startAt: { type: "string" },
            endAt: { type: "string" },
          },
        },
        guests: {
          type: "array",
          items: {
            type: "string",
          },
        },
        activity: { type: "string" },
        status: {
          type: "string",
          enum: ["fulfilled", "confirmed", "pending", "cancelled"],
        },
        isPrivate: { type: "boolean" },
        space: { type: "string" },
      },
      additionalProperties: false,
      minProperties: 1,
    },
  },
};

module.exports = reservationSchema;
