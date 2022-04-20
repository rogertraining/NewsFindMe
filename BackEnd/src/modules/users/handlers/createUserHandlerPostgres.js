import bcrypt from "bcrypt"
import { randomUUID } from "crypto"
import Prisma from "@prisma/client"
import { UsersInMemoryRepository } from "../repositories/in-memory/UsersInMemoryRepository.js"
//import { UsersPostgresRepository } from "../repositories/postgres/UsersPostgresRepository.js"

export async function createUserHandlerPostgres(request, response) {
  const { firstname, lastname, email, password, preferences } = request.body
  
  const prisma = new Prisma.PrismaClient()
  const client_preferences = await prisma.category.findMany({
    where: {
      OR: [
        {
          name: "saude"
        },
        {
          name: "carros"
        }
      ]
    }
  })

  // await prisma.news.create({
  //   data: {
  //     id: randomUUID(),
  //     title: "morre o mendigo comedor de casadas",
  //     image_url: "g1.comkkkk",
  //     link: "g1.comkkkkkkk",
  //     posted_at: new Date(),
  //     categoryId: client_preferences[1].id,
  //   }
  // })

  const news = await prisma.news.findMany({
    where: {
      categoryId: 2
    }
  })

  const user_id = randomUUID()

  await prisma.user.create({
    data: {
      id: user_id,
      email: "teste@gmail.com.br",
      firstname: "grodosbova",
      lastname: "grodosbova",
      password: "mass",
      created_at: new Date(),
      preferences: {
        create: [
          {
            category: {
              connect: {
                id: client_preferences[0].id
              }
            }
          },
          {
            category: {
              connect: {
                id: client_preferences[1].id
              }
            }
          },
        ]
      }
    }
  });

  const user = await prisma.user.findFirst({
    where: {
      firstname: "grodosbova"
    },
    include: {
      news: true,
      preferences: true, 
    }
  })

  return response.status(200).send(user)
}
