import { UsersInMemoryRepository } from "../repositories/in-memory/UsersInMemoryRepository.js"
import { CreateUserService } from "../services/CreateUserService.js"

export async function createUserHandler(request, response) {
  const { name, email, password } = request.body

  const service = 
    new CreateUserService(UsersInMemoryRepository.getInstance())

  const createdUser = await service.execute(name, email, password)

  return response.status(201).send(createdUser)
}
  

