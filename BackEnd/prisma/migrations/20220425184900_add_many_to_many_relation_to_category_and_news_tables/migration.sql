/*
  Warnings:

  - You are about to drop the column `categoryId` on the `News` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_categoryId_fkey";

-- AlterTable
ALTER TABLE "News" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "Category_News" (
    "categoryId" INTEGER NOT NULL,
    "newsId" UUID NOT NULL,

    CONSTRAINT "Category_News_pkey" PRIMARY KEY ("categoryId","newsId")
);

-- AddForeignKey
ALTER TABLE "Category_News" ADD CONSTRAINT "Category_News_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category_News" ADD CONSTRAINT "Category_News_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
