import "../../../../config.js"
import axios from "axios"
import { AppError } from "../../../shared/error/AppError.js"
import { NewsInMemoryRepository } from "../repository/NewsInMemoryRepository.js"

export async function getCustomNewsHandler(request, response) {
  const { preferences } = request.body

  const newsRequest =
    await axios.post(`http://${process.env.WEB_SCRAPPER_URL.trim()}/noticias`, { Escolhas: preferences })
    .catch((err) => {
      console.log(err)
      throw new AppError(400, { message: err.message })
    })
  const newsData = Object.entries(newsRequest.data)
  console.log(newsData[1][0])
  const repository = NewsInMemoryRepository.getInstance()

  const savedNews = repository.create(newsData, preferences)

  return response.status(201).send(savedNews)
}