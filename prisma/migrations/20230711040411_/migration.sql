/*
  Warnings:

  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoriesToShop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_shopId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriesToShop" DROP CONSTRAINT "_CategoriesToShop_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriesToShop" DROP CONSTRAINT "_CategoriesToShop_B_fkey";

-- DropTable
DROP TABLE "Categories";

-- DropTable
DROP TABLE "Photo";

-- DropTable
DROP TABLE "_CategoriesToShop";

-- CreateTable
CREATE TABLE "ShopPhoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShopPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToShop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToShop_AB_unique" ON "_CategoryToShop"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToShop_B_index" ON "_CategoryToShop"("B");

-- AddForeignKey
ALTER TABLE "ShopPhoto" ADD CONSTRAINT "ShopPhoto_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToShop" ADD CONSTRAINT "_CategoryToShop_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToShop" ADD CONSTRAINT "_CategoryToShop_B_fkey" FOREIGN KEY ("B") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
