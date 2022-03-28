import { UsersInMemoryRepository } from "../repositories/in-memory/UsersInMemoryRepository.js"

export async function deleteUserHandler(request, response) {

    const repository = UsersInMemoryRepository.getInstance()

    const deletedUser = await repository.delete(request.params.id)

    return response.status(200).send(deletedUser)
}