/*
  Warnings:

  - You are about to drop the column `situation` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "situation",
ADD COLUMN     "statusType" "Status" NOT NULL DEFAULT 'NOVO';
