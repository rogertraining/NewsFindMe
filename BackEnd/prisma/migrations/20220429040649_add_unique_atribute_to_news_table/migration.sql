/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `News` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "News_link_key" ON "News"("link");
