import { UsersInMemoryRepository } from "../repositories/in-memory/UsersInMemoryRepository.js";

export async function getAllUsersHandler(request, response) {
  const repository = 
    UsersInMemoryRepository.getInstance()

  const users = await repository.findAll()

  return response.status(200).send(users)
}