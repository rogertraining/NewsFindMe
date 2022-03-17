import { Router } from "express";
import { AppError } from "../../../error/AppError.js";

import usersRoutes from "./users.routes.js";

const routes = Router();

routes.get("/users", (request, response) =>  {
  throw new AppError(502, "test");
});

export default routes;
