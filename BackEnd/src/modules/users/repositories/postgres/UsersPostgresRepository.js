import { randomUUID } from "crypto"
import knexClient from "../../../../shared/infra/database/knex-client.js";
import { User } from "../../models/User.js"

export class UsersPostgresRepository {
  constructor() {
    this._repository = knexClient("users")
  }
  static getInstance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new UsersPostgresRepository();
    }
    return this.INSTANCE;
  }

  async create({ firstname, lastname, email, password } = userData) {
    const user = new User(randomUUID, firstname, lastname, email, password)

    const created = await knexClient("users").insert({
      id: user.id,
      firstname,
      lastname,
      email,
      password,
      created_at: user.created_at
    });
    
    return created
  }

}