import { expect, describe, test, jest } from "@jest/globals";
import { UsersPostgresRepository } from "../../../src/modules/users/repositories/postgres/UsersPostgresRepository.js";
import user from "../../dummies/default_user_dummy.js";

const { name, email, password } = user
describe("Users Postgres Repository - tests suite for object persistency with knexjs", () => {
  test("yes.", async () => {
    const repo = new UsersPostgresRepository()

    const data = await repo.create({ firstname: name, lastname: "zap", email, password });
    console.log(data)
  });
});