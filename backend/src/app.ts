import "dotenv/config";
import express from "express";
import moviesRoutes from "./movies/movies.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { errorHandler } from "./errors/errorHandler";
import { loadConfig } from "./config";
const config = loadConfig();
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.use(moviesRoutes);
app.use(errorHandler);
app.listen(config.port, () => {
console.log(`Servidor rodando em http://localhost:${config.port}`);
});