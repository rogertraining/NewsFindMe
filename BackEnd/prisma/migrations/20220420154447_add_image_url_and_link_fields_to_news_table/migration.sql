/*
  Warnings:

  - Added the required column `image_url` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL;
