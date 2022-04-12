import { randomUUID } from "crypto"

export class News {
  constructor(title, link, image_url, posted_at) {
    if (!this.id) {
      this.id = randomUUID()
    }
  }
}