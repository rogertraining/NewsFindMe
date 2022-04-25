import Prisma from "@prisma/client"
import { defineCategoriesPrismaParams } from "./utils/defineFindCategoriesPrismaParams.js";

const { PrismaClient } = Prisma

export class CategoriesPostgresRepository {
  constructor() {
    this._repository = new PrismaClient()
  }

  static getInstance() {
    if(!this._INSTANCE) {
      this._INSTANCE = new CategoriesPostgresRepository()
    }
    return this._INSTANCE
  }

  async findManyByNames(categories) {
    if (categories.length === 1) {
      return this._repository.category.findMany({
          where: {
            name: categories[0]
          },
      });
    }

    const find_categories_prisma_params = 
      defineCategoriesPrismaParams(categories)

    const foundCategories = await this._repository.category.findMany({
      where: {
        OR: find_categories_prisma_params
      }
    })

    return foundCategories
  }
}