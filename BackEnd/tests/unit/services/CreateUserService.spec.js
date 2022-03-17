import bcrypt from "bcrypt"
import { randomUUID } from "crypto"  
import { expect, describe, test, jest, beforeEach } from "@jest/globals";

import { AppError } from "../../../src/shared/error/AppError.js"
import { CreateUserService } from "../../../src/modules/users/services/CreateUserService.js"
import { UsersInMemoryRepository } from "../../../src/modules/users/repositories/in-memory/UsersInMemoryRepository.js"

import user from "../../dummies/default_user_dummy.js"
import error_messages from "../../../src/shared/constants/error_messages.js"

const { USER_EMAIL_INVALID_ERROR } = error_messages
const { name, email, password } = user

describe("Create User Service - suite de testes para o serviço de criação de usuário", () => {
    beforeEach(() => {
      jest.restoreAllMocks()
      jest.clearAllMocks()
    })

    test("Deve chamar a função de criação de usuário e retornar os dados do usuário criado", async () => {
        const repository = new UsersInMemoryRepository()

        jest.spyOn(bcrypt, bcrypt.hashSync.name).mockReturnValue(password)
        jest.spyOn(repository, "create").mockReturnValue(user)

        Object.assign(user, {
            created_at: new Date().getTime(),
            id: randomUUID()
        })
        const service = new CreateUserService(repository)
        const resultado = await service.execute({name, email, password})

        expect(resultado).toEqual(user);
    })
 
    describe("exceções", () => {
      test("Deve retornar erro caso o repository indique erro ao tentar criar um usuário de mesmo email", async () => {
        const { name, email, password } = user
        const repository = new UsersInMemoryRepository()

        jest.spyOn(bcrypt, bcrypt.hashSync.name).mockReturnValue(password)
        jest.spyOn(repository, "create").mockImplementation(() => {
          throw new AppError(400, USER_EMAIL_INVALID_ERROR)
        })

        await expect(async () => {
          const service = new CreateUserService(repository)
          await service.execute({ name, email, password })
        }).rejects.toThrow(USER_EMAIL_INVALID_ERROR)
        
      })
    })
})