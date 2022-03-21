import { Router } from "express";
import { AppError } from "../../../error/AppError.js";

import usersRoutes from "./users.routes.js";

const routes = Router();

routes.use("/users", usersRoutes);

export default routes;
