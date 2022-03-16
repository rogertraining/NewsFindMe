import { User } from "../../models/User.js";

export class UsersInMemoryRepository {
  constructor() {
    this._repository = [];
  }

  static getInstance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new UsersInMemoryRepository();
    }
    return this.INSTANCE;
  }

  async create({ name, email, password }) {
    if (await this.findByEmail()) {
      throw new Error("Email já está sendo utilizado");
    }

    const newUser = new User(name, email, password);

    Object.assign(newUser, {
      created_at: new Date().getTime(),
    });

    this._repository.push(newUser);

    return newUser;
  }

  async findByEmail(email) {
    return this._repository.find((user) => user.email === email);
  }
}
