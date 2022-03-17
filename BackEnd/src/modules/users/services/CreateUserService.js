import bcrypt from "bcrypt"

export class CreateUserService {
    constructor(_usersRepository) {
        this._usersRepository = _usersRepository
    }

    async execute({ nome, email, senha }) {
        const novaSenha = bcrypt.hashSync(senha, 10)

        const usuario = await this._usersRepository.create({ nome, email, senha: novaSenha })

        return usuario
    }
}

