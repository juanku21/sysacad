/*
  Warnings:

  - You are about to alter the column `cuil` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `phone` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cuil" SET DATA TYPE INTEGER,
ALTER COLUMN "phone" SET DATA TYPE INTEGER;
