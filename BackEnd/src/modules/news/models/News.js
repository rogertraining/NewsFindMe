import { randomUUID } from "crypto"

export class News {
  constructor() {
    if (!this.id) {
      this.id = randomUUID()
    }
  }
}