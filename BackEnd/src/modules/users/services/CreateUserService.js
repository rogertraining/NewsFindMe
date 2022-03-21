import bcrypt from "bcrypt"

export class CreateUserService {
    constructor(_usersRepository) {
        this._usersRepository = _usersRepository
    }

    async execute(name, email, password) {

        const newPassword = bcrypt.hashSync(password , 10)

        const user = await this._usersRepository.create(name, email, newPassword)

        return user
    }
}

