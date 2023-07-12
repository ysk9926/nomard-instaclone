/*
  Warnings:

  - You are about to drop the column `shopId` on the `Categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_shopId_fkey";

-- DropIndex
DROP INDEX "Categories_name_key";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "shopId";

-- CreateTable
CREATE TABLE "_CategoriesToShop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesToShop_AB_unique" ON "_CategoriesToShop"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesToShop_B_index" ON "_CategoriesToShop"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_slug_key" ON "Categories"("slug");

-- AddForeignKey
ALTER TABLE "_CategoriesToShop" ADD CONSTRAINT "_CategoriesToShop_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToShop" ADD CONSTRAINT "_CategoriesToShop_B_fkey" FOREIGN KEY ("B") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
