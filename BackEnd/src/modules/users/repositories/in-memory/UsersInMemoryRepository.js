import { randomUUID } from "crypto"

import error_messages from "../../../../shared/constants/error_messages.js";
import { User } from "../../models/User.js";
import { AppError } from "../../../../shared/error/AppError.js"

const { 
  USER_EMAIL_INVALID_ERROR, 
  USER_NOT_FOUND_ERROR 
} = error_messages

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

  async create({ firstname, lastname, email, password } = createUserData) {
    if (await this.findByEmail(email)) {
      throw new AppError(400, USER_EMAIL_INVALID_ERROR)
    }

    const id = randomUUID()
    const newUser = new User(id, firstname, lastname, email, password);

    this._repository.push(newUser);

    return newUser;
  }

  async delete(id) {
    const user = await this.findById(id)

    if (!user) {
      throw new AppError(400, USER_NOT_FOUND_ERROR)
    }

    this._repository = 
      this._repository.filter((user) => user.id !== id)

    return user
  }

  async findByEmail(email) {
    return this._repository.find((user) => user.email === email);
  }

  async findById(id) {
    return this._repository.find((user) => user.id === id)
  }

  async update({ 
    user_id, 
    firstname, 
    lastname, 
    password 
  } = updateUseData) {
    const user = await this.findById(user_id);

    if (!user) {
      throw new AppError(400, USER_NOT_FOUND_ERROR)
    }

   user.firstname = firstname || user.firstname
   user.lastname = lastname || user.lastname
   user.password = password || user.password
   
   return user
  }
}
