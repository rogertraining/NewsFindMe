export class GetUserByIdService {
  constructor(usersRepository) {
    this._usersRepository = usersRepository
  }

  async execute(id) {
    const user = await this._usersRepository.findById(id);

    return user;
  }
}