import swaggerJSDoc, { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "API dp Cinefilia",
            version: "0.3.0",
            description: "Documentação da API de backloggd-like Cinefilia",
        },
        servers: [
            {
                url:"http://localhost:3000",
                description: "Servidor Local",
            },
        ],
    },
apis: [
    "./src/**/*.routes.ts",
    "./src/**/*.controller.ts"
],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions)

