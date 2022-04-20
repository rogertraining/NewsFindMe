/*
  Warnings:

  - The primary key for the `News` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postedAt` on the `News` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User_Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User_News` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `categoryId` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posted_at` to the `News` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `News` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `User_Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `User_News` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `newsId` on the `User_News` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "User_Category" DROP CONSTRAINT "User_Category_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_News" DROP CONSTRAINT "User_News_newsId_fkey";

-- DropForeignKey
ALTER TABLE "User_News" DROP CONSTRAINT "User_News_userId_fkey";

-- AlterTable
ALTER TABLE "News" DROP CONSTRAINT "News_pkey",
DROP COLUMN "postedAt",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "posted_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "News_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User_Category" DROP CONSTRAINT "User_Category_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "User_Category_pkey" PRIMARY KEY ("userId", "categoryId");

-- AlterTable
ALTER TABLE "User_News" DROP CONSTRAINT "User_News_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "newsId",
ADD COLUMN     "newsId" UUID NOT NULL,
ADD CONSTRAINT "User_News_pkey" PRIMARY KEY ("userId", "newsId");

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Category" ADD CONSTRAINT "User_Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_News" ADD CONSTRAINT "User_News_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_News" ADD CONSTRAINT "User_News_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
