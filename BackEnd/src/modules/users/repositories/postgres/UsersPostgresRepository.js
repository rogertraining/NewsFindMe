import Prisma from "@prisma/client"
import bcrypt from "bcrypt"
import { randomUUID } from "crypto";
import { defineUserPreferencesPrismaParams } from "./utils/defineUserPreferencesPrismaParams.js";

const { PrismaClient } = Prisma

export class UsersPostgresRepository {
  constructor() {
    this._repository = new PrismaClient()
  }

  static getInstance() {
    if (!this._INSTANCE) {
      this._INSTANCE = new UsersPostgresRepository()
    }

    return this._INSTANCE
  }

  async createUser({
    firstname, 
    lastname, 
    email, 
    password, 
    preferences
  }) {
    const preferences_prisma_params = 
      defineUserPreferencesPrismaParams(preferences)

    const userId = randomUUID()

    await this._repository.user.create({
      data: {
        id: userId,
        email,
        firstname,
        lastname,
        password,
        created_at: new Date(),
        preferences: {
          create: preferences_prisma_params
        },
      }
    });

    const createdUser = await this.findById(userId)

    return createdUser
  }
  
  async findById(id) {
    const user = this._repository.user.findUnique({
      where: {
        id,
      },
      include:{
        preferences: true,
      }
    });

    return user
  }

  async findAllUsers() {
    return this._repository.user.findMany();
  }
}
    // async findAllUsers(request, response) {
    //     try {
    //         const users = await prisma.user.findMany()

    //         return response.json(users)
    //     } catch (error) {
    //         return response.json(error)
    //     }
    // },

    // async findUser(request, response) {
    //     try {
    //         const { id } = request.params

    //         const user = await prisma.user.findUnique({
    //             where: {
    //                 id: Number(id)
    //             }
    //         })
    //         if (!user) {
    //             return response.json({ error: "Não foi possivel encontrar esse usuário" })
    //         }
    //         return response.json(user)
    //     } catch (error) {
    //         return response.json(error)
    //     }
    // },

    // async updateUser(request, response) {
    //     try {
    //         const { id } = request.params
    //         const { firstname, lastname, email, password } = request.body

    //         let user = await prisma.user.findUnique({ where: { id: Number(id) } })

    //         if (!user) {
    //             return response.json({ error: "Não foi possivel encontrar esse usuário" })
    //         }

    //         user = await prisma.user.update({
    //             where: {
    //                 id: Number(id)
    //             },
    //             data: {
    //                 firstname,
    //                 lastname,
    //                 email,
    //                 password
    //             }
    //         })
    //     } catch (error) {
    //         return response.json(error)
    //     }
    // },

    // async deleteUser(request, response) {
    //     try {
    //         const { id } = request.params

    //         const user = await prisma.user.delete({
    //             where: {
    //                 id: Number(id)
    //             }
    //         })

    //         if (!user) {
    //             return response.json({ error: "Não foi possivel encontrar esse usuário" })
    //         }

    //         return response.json({ message: "Usuário deletado" })
    //     } catch (error) {
    //         return response.json(error)
    //     }
    // }
//}
