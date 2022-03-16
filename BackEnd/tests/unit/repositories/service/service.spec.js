import { expect, describe, test, jest } from "@jest/globals";
import {UsersInMemoryRepository} from "../../../../src/modules/users/repositories/in-memory/UsersInMemoryRepository"
import user from "../../../dummies/default_user_dummy.js"
import {Service} from "../../../../src/service/service.js"
import bcrypt from "bcrypt"

jest.mock('../../../../src/modules/users/repositories/in-memory/UsersInMemoryRepository', () => ({
    create: jest.fn(),
    findByEmail: jest.fn()
  }))
jest.doMock("bcrypt")
describe("Esse teste são responsaveis por testar o serviço de criação de usuário", () => {
    test("Deve retornar um usuário criado", () => {
        const {name, email, password} = user
        const repository = new UsersInMemoryRepository()
        const usuarioCriado = user
        jest.spyOn(bcrypt, bcrypt.hashSync.name).mockReturnValue(password)
        jest.spyOn(repository, repository.create.name).mockReturnValue(user)
        Object.assign(usuarioCriado, {
            created_at: new Date().getTime()
        })
        const service = new Service(repository)
        const resultado = service.execute({name, email, password})
    })
})