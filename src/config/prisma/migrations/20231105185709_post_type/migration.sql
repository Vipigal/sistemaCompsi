-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('BANNER', 'SECTION', 'DEFAULT');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "type" "PostType" NOT NULL DEFAULT 'DEFAULT';
