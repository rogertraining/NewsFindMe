import bcrypt from "bcrypt"

export class CreateUserService {
    constructor(_usersRepository) {
        this._usersRepository = _usersRepository
    }

    async execute({ firstname, lastname, email, password } = createUserDTO) {
        const newPassword = bcrypt.hashSync(password , 10)

        const user = await this._usersRepository.create({ firstname, lastname, email, password })

        return user
    }
}

