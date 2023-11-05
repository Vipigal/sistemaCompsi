/*
  Warnings:

  - Added the required column `productPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('PURCHASE', 'WISH');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'COMPLETE');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "amount" INTEGER,
ADD COLUMN     "productPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "OrderStatus",
ADD COLUMN     "tax" DOUBLE PRECISION,
ADD COLUMN     "total" DOUBLE PRECISION,
ADD COLUMN     "type" "OrderType" NOT NULL DEFAULT 'WISH';
