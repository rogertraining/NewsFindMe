import { UsersInMemoryRepository } from "../repositories/in-memory/UsersInMemoryRepository.js"
//import { UsersPostgresRepository } from "../repositories/postgres/UsersPostgresRepository.js"
import bcrypt from "bcrypt"

export async function createUserHandler(request, response) {
  const { firstname, lastname, email, password, preferences } = request.body
  
  const repository = 
    await UsersInMemoryRepository.getInstance()

  const hashedPassword = bcrypt.hashSync(password, 10)

  const createdUser = await repository.create({ 
    firstname, 
    lastname, 
    email,
    preferences,
    password: hashedPassword 
  })

  return response.status(201).send({
    id: createdUser.id,
    firstname: createdUser.firstname,
    lastname: createdUser.lastname,
    email: createdUser.email,
    preferences: createdUser.preferences,
    created_at: createdUser.created_at
  })
}
