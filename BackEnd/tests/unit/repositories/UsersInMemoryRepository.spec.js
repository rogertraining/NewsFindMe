import { expect, describe, test, jest } from "@jest/globals";

import { UsersInMemoryRepository } from "../../../src/modules/users/repositories/in-memory/UsersInMemoryRepository.js";
import user from "../../dummies/default_user_dummy.js";

const { name, email, password } = user;

describe("Users In Memory Repository - tests suite for object persistency", () => {
  test("should be able to create a new user with valid name, email and password", async () => {
    const repository = UsersInMemoryRepository.getInstance();

    const createdUser = await repository.create({ name, email, password });

    expect(createdUser).toMatchObject(user);
    expect(createdUser.created_at).toBeDefined();
  });

  describe("exceptions", () => {
    test("should be able to throw an error in case the user email is already being used by another user", async () => {
      const repository = UsersInMemoryRepository.getInstance();

      jest.spyOn(repository, repository.findByEmail.name).mockReturnValue({
        name,
        email,
        password,
        created_at: new Date().getTime(),
      });

      expect(async () => {
        await repository.create({ name, email, password });
      }).rejects.toThrow("Email já está sendo utilizado");
    });
  });
});
