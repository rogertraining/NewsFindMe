import { GetUserByIdService } from "../services/GetUserByIdService.js"
import { UsersInMemoryRepository } from "../repositories/in-memory/UsersInMemoryRepository.js"


export async function getUserByIdHandler(request, response) {
  const { id } = request.params

  const service = 
    new GetUserByIdService(UsersInMemoryRepository.getInstance())

  const user = await service.execute(id)

  return response.status(200).send(user)
}