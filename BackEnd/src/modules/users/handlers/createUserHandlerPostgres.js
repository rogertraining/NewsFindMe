import bcrypt from "bcrypt"
import { UsersPostgresRepository } from "../repositories/postgres/UsersPostgresRepository.js"
import { CategoriesPostgresRepository } from "../../categories/repository/postgres/CategoriesPostgresRepository.js"

export async function createUserHandlerPostgres(request, response) {
  const { firstname, lastname, email, password, preferences } = request.body

  const categories_repository =
    CategoriesPostgresRepository.getInstance()
  const users_repository = UsersPostgresRepository.getInstance()

  const foundPreferences = 
    await categories_repository.findManyByNames(preferences)

  const hashed_password = bcrypt.hashSync(password, 10)

  const user = await users_repository.createUser({
    firstname,
    lastname,
    email,
    password: hashed_password,
    preferences: foundPreferences,
  })

  return response.status(200).send(user)
}
