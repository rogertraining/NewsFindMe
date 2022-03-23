import { expect, describe, test, jest } from "@jest/globals";

import error_messages from "../../../src/shared/constants/error_messages.js";
import user from "../../dummies/default_user_dummy.js";
import { UsersInMemoryRepository } from "../../../src/modules/users/repositories/in-memory/UsersInMemoryRepository.js";

const { 
  USER_EMAIL_INVALID_ERROR, 
  USER_NOT_FOUND_ERROR } 
= error_messages;
const { name, email, password } = user;

describe("Users In Memory Repository - tests suites for object persistency", () => {
  describe("Create User tests suite", () => {
    test("should be able to create a new user with valid name, email and password", async () => {
      const repository = new UsersInMemoryRepository()
  
      const createdUser = await repository.create( name, email, password );

      expect(createdUser).toMatchObject(user);
      expect(createdUser.created_at).toBeDefined();
    });
  });
  
  describe("Get User by Id tests suite", () => {
    test("should be able to find an existent user by id with its data", async () => {
      const repository = new UsersInMemoryRepository()

      const createUser = await repository.create( name, email, password )

      const findUser = await repository.findById(createUser.id)

      expect(findUser).toEqual(createUser)
    });
  });

  describe("Delete User tests suite", () => {
    test("should be able to delete an existent user", async () => {
      const repository = new UsersInMemoryRepository()

      const createUser = await repository.create( name, email, password )

      const deleteUser = await repository.delete(createUser.id)

      expect(deleteUser).toEqual(createUser)
      expect(await repository.findById(createUser.id)).toBeFalsy()
    });
  });

  describe("Exceptions", () => {
    test("should be able to throw an error in case the user email is already being used by another user", async () => {
      const repository = new UsersInMemoryRepository()

      jest.spyOn(repository, "findByEmail").mockReturnValue({
        name,
        email,
        password,
        created_at: new Date().getTime(),
      });

      await expect(async () => {
        await repository.create({ name, email, password });
      }).rejects.toThrow(USER_EMAIL_INVALID_ERROR);
    });

    test("should be able to throw an error in case the user to be deleted doesnt exists", async () => {
      const repository = new UsersInMemoryRepository()

      jest.spyOn(repository, "findById").mockReturnValue(undefined)

      expect(async () => {
        await repository.delete("any-valid-id")
      }).rejects.toThrow(USER_NOT_FOUND_ERROR);
    });
  });
});
