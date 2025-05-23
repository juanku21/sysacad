/*
  Warnings:

  - Added the required column `updatedAt` to the `cities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `universities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "universities" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
