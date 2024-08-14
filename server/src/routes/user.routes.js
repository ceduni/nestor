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

    // Route to update a user by ID (protected route)
    fastify.put(
    "/:id",
    {
        preHandler: userService.authenticateToken,
        schema: {
        body: {
            type: "object",
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
    userService.updateUser
    );

    // Route to get a specific user by ID (protected route)
    fastify.get(
    "/:id",
    {
        preHandler: userService.authenticateToken,
    },
    userService.getUser
    );
}



module.exports = getUserRoutes;