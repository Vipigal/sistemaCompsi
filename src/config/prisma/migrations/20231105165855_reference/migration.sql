/*
  Warnings:

  - You are about to drop the column `statusType` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "statusType",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOVO';
