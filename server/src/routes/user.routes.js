const userService = require("../services/user.service");

async function getRoutes(fastify, options){
    // Add a new user
    fastify.post(
        "/register",
        {
        schema: {
            body: {
            type: "object",
            required: ["userName", "firstName", "lastName", "email", "password", "role"],
            properties: {
                userName: { type: "string" },
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
                role: { type: "string", enum: ["admin", "student"] },
            },
            },
        },
        },
        userService.addUser
    );
}

module.exports = getRoutes;