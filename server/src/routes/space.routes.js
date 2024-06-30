const spaceService = require("../services/space.service");
async function getRoutes(fastify, options) {
  fastify.get("/", spaceService.getSpaces);
  fastify.get("/:id", spaceService.getSpace);
  fastify.post("/",fastify.getSchema("spaceSchema"), spaceService.addSpace);
  fastify.put("/:id",fastify.getSchema("spaceSchema"), spaceService.updateSpace);
  fastify.delete("/:id", spaceService.removeSpace);

  fastify.post("/:id/availabilities/",
      {
        schema: {
          body: {$ref: "spaceSchema#/schema/body/properties/availabilities/items"}
        }
      }, spaceService.addAvailability);

  fastify.put("/:spaceId/availabilities/:availId",
      {
          schema: {
              body: {$ref: "spaceSchema#/schema/body/properties/availabilities/items"}
          }
      }, spaceService.updateAvailability);
  fastify.delete("/:spaceId/availabilities/:availId", spaceService.removeAvailability);
  fastify.post("/:id/images/",
      {
          schema: {
              body: {$ref: "spaceSchema#/schema/body/properties/images/items"}
          }
      }, spaceService.addImage);
  fastify.put("/:spaceId/images/:imageId",
      {
          schema: {
              body: {$ref: "spaceSchema#/schema/body/properties/images/items"}
          }
      }, spaceService.updateImage);
  fastify.delete("/:spaceId/images/:imageId", spaceService.removeImage)
}

module.exports = getRoutes;
