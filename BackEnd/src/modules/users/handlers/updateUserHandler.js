import { UsersInMemoryRepository } from "../repositories/in-memory/UsersInMemoryRepository.js"

export async function updateUserHandler(request, response) {
  const { id } = request.params

  const { lastname, firstname} = request.body

  const repository = await UsersInMemoryRepository.getInstance()

  await repository.update({user_id: id , lastname, firstname})

  return response.status(200).send({message:"Usuário atualizado"})
}
