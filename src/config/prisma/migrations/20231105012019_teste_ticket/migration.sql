/*
  Warnings:

  - The values [EM_ESPERA] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('NOVO', 'TRANSFERIDO', 'RESPONDIDO', 'ESPERA', 'RESOLVIDO');
ALTER TABLE "Ticket" ALTER COLUMN "situation" DROP DEFAULT;
ALTER TABLE "Ticket" ALTER COLUMN "situation" TYPE "Status_new" USING ("situation"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Ticket" ALTER COLUMN "situation" SET DEFAULT 'NOVO';
COMMIT;
