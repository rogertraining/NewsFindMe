import { Router } from "express";

const usersRoutes = Router();

usersRoutes.post("/", (request, response) => {
  const { name, email, password } = request.body;

  if (name && email && password) {
    return response.status(201).send({ message: "deu certo" });
  }

  return response.status(400).send({ message: "deu errado" });
});

export default usersRoutes;
