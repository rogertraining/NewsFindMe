import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

import usersRoutes from "./users.routes.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const jsonFilePath = 
  path.resolve(__dirname, "..", "..", "..", "..", "..", "./swagger.json")

const fileBuffer = fs.readFileSync(jsonFilePath);

const fileJson = JSON.parse(fileBuffer.toString())

const routes = Router();

routes.use("/users", usersRoutes)
routes.use("/api-docs", swaggerUi.serve)
routes.get("/api-docs", swaggerUi.setup(fileJson))

export default routes;
