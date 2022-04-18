import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import bcrypt from "bcrypt"

export default {
    async createUser(request, response) {
        try {
            const { firstname, lastname, email, password } = request.body

            let user = await prisma.user.findUnique({ where: { email } })

            if (user) {
                return response.json({ error: "Já existe um usuario com esse e-mail" })
            }

            const hashedPassword = bcrypt.hashedPassword(password, 10)

            await prisma.user.create({
                data: {
                    firstname,
                    lastname,
                    email,
                    password: hashedPassword
                }
            })
            return response.json({ message: "Usuário cadastrado com sucesso" })

        } catch (error) {
            return response.json(error)
        }

    },

    async findAllUsers(request, response) {
        try {
            const users = await prisma.user.findMany()

            return response.json(users)
        } catch (error) {
            return response.json(error)
        }
    },

    async findUser(request, response) {
        try {
            const { id } = request.params

            const user = await prisma.user.findUnique({
                where: {
                    id: Number(id)
                }
            })
            if (!user) {
                return response.json({ error: "Não foi possivel encontrar esse usuário" })
            }
            return response.json(user)
        } catch (error) {
            return response.json(error)
        }
    },

    async updateUser(request, response) {
        try {
            const { id } = request.params
            const { firstname, lastname, email, password } = request.body

            let user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) {
                return response.json({ error: "Não foi possivel encontrar esse usuário" })
            }

            user = await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    firstname,
                    lastname,
                    email,
                    password
                }
            })
        } catch (error) {
            return response.json(error)
        }
    },

    async deleteUser(request, response) {
        try {
            const { id } = request.params

            const user = await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            })

            if (!user) {
                return response.json({ error: "Não foi possivel encontrar esse usuário" })
            }

            return response.json({ message: "Usuário deletado" })
        } catch (error) {
            return response.json(error)
        }
    }
}
