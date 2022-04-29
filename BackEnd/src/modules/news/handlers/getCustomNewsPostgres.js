import "../../../../config.js"
import axios from "axios"
import { AppError } from "../../../shared/error/AppError.js"
import { CategoriesPostgresRepository } from "../../categories/repository/postgres/CategoriesPostgresRepository.js"
import { NewsPostgresRepository } from "../repository/postgres/NewsPostgresRepository.js"


export async function getCustomNewsHandlerPostgres(request, response) {
  const { preferences, user_id } = request.body

  const newsRequest =
    await axios.post(`http://${process.env.WEB_SCRAPPER_URL.trim()}/noticias`, { Escolhas: preferences })
    .catch((err) => {
      console.log(err)
      throw new AppError(400, { message: err.message })
    })
  const newsData = Object.entries(newsRequest.data)

  const news_repository = NewsPostgresRepository.getInstance()

  const savedNews = await news_repository.createMany(newsData, user_id)

  return response.status(201).send(savedNews)
}