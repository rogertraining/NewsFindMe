import axios from "axios"
import { AppError } from "../../../shared/error/AppError.js"
import { NewsInMemoryRepository } from "../repository/NewsInMemoryRepository.js"

export async function getCustomNewsHandler(request, response) {
  const { preferences } = request.body

  const newsRequest = 
    await axios.post("http://localhost:56733/noticias", { Escolhas: preferences })
    .catch((err) => {
      throw new AppError(400, { message: err.message })
    })

  const newsData = Object.entries(newsRequest.data)

  const repository = NewsInMemoryRepository.getInstance()

  const savedNews = repository.create(newsData, preferences)

  return response.status(201).send(savedNews)
}