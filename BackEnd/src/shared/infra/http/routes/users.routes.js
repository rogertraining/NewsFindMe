import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { createUserHandler } from "../../../../modules/users/handlers/createUserHandler.js"
import { getUserByIdHandler } from "../../../../modules/users/handlers/getUserByIdHandler.js"
import { deleteUserHandler } from "../../../../modules/users/handlers/deleteUserHandler.js"
import { updateUserHandler } from "../../../../modules/users/handlers/updateUserHandler.js"
import { getAllUsersHandler } from "../../../../modules/users/handlers/getAllUsersHandler.js";
import { createUserHandlerPostgres } from "../../../../modules/users/handlers/createUserHandlerPostgres.js";

const usersRoutes = Router();

usersRoutes.post(
  "/", 
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstname: Joi.string().min(3).max(30).required(),
      lastname: Joi.string().min(4).max(55).required(),
      email: Joi.string().email().min(8).max(30).required(),
      preferences: Joi.array().items(Joi.string()).min(1).required(),
      password: Joi.string().min(6).max(25).required()
    })
  }),
  createUserHandler
);

usersRoutes.post("/test", createUserHandlerPostgres)

usersRoutes.get("/", getAllUsersHandler)

usersRoutes.get(
  "/:id", 
  celebrate({
    [Segments.PARAMS]: Joi.string().uuid()
  }),
  getUserByIdHandler
);

usersRoutes.delete(
  "/:id", 
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid()
    })
  }),
  deleteUserHandler
);

usersRoutes.patch(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid()
    }),
    [Segments.BODY]: Joi.object().keys({
      firstname: Joi.string().min(3).max(30),
      lastname: Joi.string().min(4).max(55),
    })
  }), 
  updateUserHandler
);

export default usersRoutes;
