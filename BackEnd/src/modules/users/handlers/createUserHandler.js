import { Service } from "../services/service.js";

export function createUserHandler(request, response) {
  const { name, email, password } = request.body;

  const createUserService = new Service
}