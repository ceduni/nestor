const userService = require("../services/user.service");

async function getUserRoutes(fastify, options){
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

    // Route to login a user
    fastify.post(
        "/login",
        {
            schema: {
                body: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string" },
                        password: { type: "string" },
                    },
                },
            },
        },
        userService.loginUser
    );
}



module.exports = getUserRoutes;