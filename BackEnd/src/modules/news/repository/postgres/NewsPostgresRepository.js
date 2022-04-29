import Prisma from "@prisma/client"
import { randomUUID } from "crypto"
import { formatFoundNews } from "./utils/formatFoundNews.js"

const { PrismaClient } = Prisma

export class NewsPostgresRepository {
  constructor() {
    this._repository = new PrismaClient()
  }

  static getInstance() {
    if(!this._INSTANCE) {
      this._INSTANCE = new NewsPostgresRepository()
    }
    return this._INSTANCE
  }

  async createMany(newsArray, user_id) {
    const newsFormatted = formatFoundNews(newsArray)
    newsFormatted.forEach(async news => {
      await this._repository.news.create({
        data: {
          id: randomUUID(),
          title: news.title,
          link: news.link,
          image_url: news.image_url,
          posted_at: new Date(),
          categories: {
            create: news.categories
          },
          users: {
            create: [
              {
                user: {
                  connect: {
                    id: user_id
                  }
                }
              }
            ]
          }
        },
        select: {
          id: true,
          title: true,
          link: true,
          image_url: true,
          categories: true,
          posted_at: true,
        }
      });
      
    });

    return this.findManyByUserId(user_id)
  }

  async findManyByUserId(user_id) {
    return this._repository.news.findMany({
      where: {
        OR: {
          users: {
            every: {
              userId: user_id
            }
          }
        }
      },
      include: {
        categories: true,
      }
    })
  }

}
