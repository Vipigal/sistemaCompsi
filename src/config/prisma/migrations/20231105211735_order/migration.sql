/*
  Warnings:

  - You are about to drop the column `tax` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "tax",
DROP COLUMN "total",
ADD COLUMN     "fee" DOUBLE PRECISION NOT NULL DEFAULT 0;
