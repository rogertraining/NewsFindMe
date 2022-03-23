const {Pool} = require("pg")
const pool = new Pool()

class DeleteUserService {
    constructor(_usersRepository) {
        this._usersRepository = _usersRepository
    }

    async execute(id) {
        const id = await this._usersRepository.findById(id)
        return pool.query("DELETE FROM users WHERE id = $1", [id], (err) => {
            if(err) {
                console.log("Erro ao deletar usuário")
            }else {
                console.log("Usuario deletado com sucesso")
            }
        })
        pool.end()
    }
}