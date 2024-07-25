const reservationSchema = {
  $id: "reservationSchema",
  schema: {
    body: {
      type: "object",
      properties: {
        hostId: { type: "string" },
        availability: {
          type: "object",
          additionalProperties: false,
          minProperties: 1,
          properties: {
            startAt: { type: "string" },
            endAt: { type: "string" },
            _id: { type: "string" },
          },
        },
        guestIds: {
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
        spaceId: { type: "string" },
      },
      additionalProperties: false,
      minProperties: 1,
    },
  },
};

module.exports = reservationSchema;
