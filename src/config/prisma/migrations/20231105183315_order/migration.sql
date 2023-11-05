/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageURL" TEXT,
ADD COLUMN     "subtitle" TEXT;

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "productName" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productName_fkey" FOREIGN KEY ("productName") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
