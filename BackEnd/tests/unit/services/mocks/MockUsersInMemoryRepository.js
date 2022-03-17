import { jest } from "@jest/globals"

export class UsersInMemoryRepository {
  static create() {
    return jest.fn()
  }

  static findByEmail() {
    return jest.fn()
  }
}