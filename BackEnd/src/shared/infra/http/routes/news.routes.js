import Prisma from "@prisma/client"
import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { getCustomNewsHandler } from "../../../../modules/news/handlers/getCustomNewsHandler.js"
import { getCustomNewsHandlerPostgres } from "../../../../modules/news/handlers/getCustomNewsPostgres.js";

const newsRoutes = Router()

async function fodaseHandler(request, response) {
  const { PrismaClient } = Prisma

  const prisma = new PrismaClient()

  const mematakk = await prisma.news.findMany({
    where: {
      link: "https://g1.globo.com/inovacao/noticia/2022/04/28/como-spacex-de-elon-musk-divide-vilarejo-na-fronteira-entre-eua-e-mexico.ghtml",
    },
    include: {
      categories: true,
      users: true,
    }
  })

  return response.status(200).send(mematakk)
}

newsRoutes.post("/", getCustomNewsHandler)
newsRoutes.post("/test", getCustomNewsHandlerPostgres)
newsRoutes.get("/test", fodaseHandler)

export { newsRoutes }