import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../../../../swagger.json";

import { AppError } from "../../../error/AppError.js";

import usersRoutes from "./users.routes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/api-docs", swaggerUi.serve);
routes.get("/api-docs", swaggerUi.setup(swaggerFile))

export default routes;
