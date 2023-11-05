-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOVO', 'TRANSFERIDO', 'RESPONDIDO', 'EM_ESPERA', 'RESOLVIDO');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PRODUCT', 'EVENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicUrl" TEXT;

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "situation" "Status" NOT NULL DEFAULT 'NOVO',
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "productType" "Category" NOT NULL DEFAULT 'PRODUCT',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
