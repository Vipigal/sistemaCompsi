/*
  Warnings:

  - Added the required column `contactNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ALUNO', 'ADMIN', 'GERENCIAL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "userType" "Role" NOT NULL DEFAULT 'ALUNO',
ALTER COLUMN "name" SET NOT NULL;
