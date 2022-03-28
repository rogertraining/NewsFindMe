import { UsersInMemoryRepository } from "../repositories/in-memory/UsersInMemoryRepository.js"
import { UsersPostgresRepository } from "../repositories/postgres/UsersPostgresRepository.js"
import { CreateUserService } from "../services/CreateUserService.js"

async function deleteUserHandler(request, response) {
  
}

export async function createUserHandler(request, response) {
  const { firstname, lastname, email, password } = request.body
  
  const repository = 
    await UsersInMemoryRepository.getInstance()

  const createdUser = await repository.create({ firstname, lastname, email, password })

  return response.status(201).send(createdUser)
}


