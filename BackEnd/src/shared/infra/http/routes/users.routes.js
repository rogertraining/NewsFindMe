import { Router } from "express";
import { createUserHandler } from "../../../../modules/users/handlers/createUserHandler.js"
import { getUserByIdHandler } from "../../../../modules/users/handlers/getUserByIdHandler.js";
import { deleteUserHandler } from "../../../../modules/users/handlers/deleteUserHandler.js";
import { updateUserHandler } from "../../../../modules/users/handlers/updateUserHandler.js";
const usersRoutes = Router();

usersRoutes.post("/", createUserHandler)
usersRoutes.get("/:id", getUserByIdHandler)
usersRoutes.delete("/:id", deleteUserHandler)
usersRoutes.patch("/:id", updateUserHandler)
export default usersRoutes;
