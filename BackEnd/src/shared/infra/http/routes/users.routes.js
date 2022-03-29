import { Router } from "express";
import { createUserHandler } from "../../../../modules/users/handlers/createUserHandler.js"
import { getUserByIdHandler } from "../../../../modules/users/handlers/getUserByIdHandler.js";
import { deleteUserHandler } from "../../../../modules/users/handlers/deleteUserHandler.js";

const usersRoutes = Router();

usersRoutes.post("/", createUserHandler)
usersRoutes.get("/:id", getUserByIdHandler)
usersRoutes.delete("/:id", deleteUserHandler)

export default usersRoutes;
