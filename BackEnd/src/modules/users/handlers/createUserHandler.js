import { UsersInMemoryRepository } from "../repositories/in-memory/UsersInMemoryRepository.js"
import { UsersPostgresRepository } from "../repositories/postgres/UsersPostgresRepository.js"

export async function createUserHandler(request, response) {
  const { firstname, lastname, email, password } = request.body
  
  const repository = 
    await UsersInMemoryRepository.getInstance()

  const createdUser = await repository.create({ firstname, lastname, email, password })

  return response.status(201).send({
    id: createdUser.id,
    firstname: createdUser.firstname,
    lastname: createdUser.lastname,
    email: createdUser.email,
    created_at: createdUser.created_at
  })
}
