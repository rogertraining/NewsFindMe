import { Router } from "express";
import { createUserHandler } from "../../../../modules/users/handlers/createUserHandler.js"
import { getUserByIdHandler } from "../../../../modules/users/handlers/getUserByIdHandler.js";

const usersRoutes = Router();

usersRoutes.post("/", createUserHandler)
usersRoutes.get("/:id", getUserByIdHandler)

export default usersRoutes;
