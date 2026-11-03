import swaggerJSDoc, { Options } from "swagger-jsdoc";
import { globSync } from "glob";

const routesFiles = globSync("./src/**/*.routes.ts", { posix: true });
const controllerFiles = globSync("./src/**/*.controller.ts", { posix: true });

const apiPaths = [...routesFiles, ...controllerFiles];

const swaggerOptions: Options = {
    definition: { 
        openapi: "3.0.3",
        info: {
            title: "API do Cinefilia",
            version: "0.3.0",
            description: "Documentação da API de backloggd-like Cinefilia",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor Local",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Coloque o token",
                },
            },
        },
    },
    apis: apiPaths, 
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);