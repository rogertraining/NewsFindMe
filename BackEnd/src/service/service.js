import bcrypt from "bcrypt"

export class Service{
    constructor(_usersRepository) {
        this._usersRepository = _usersRepository
    }
    execute({nome, email, senha}) {
        const novaSenha = bcrypt.hashSync(senha, 10)
        const usuario = this._usersRepository.create({nome, email, senha: novaSenha}).catch((error) => "E-mail já está sendo utilizado.") 
        return usuario
    }
}

