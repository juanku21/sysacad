/*
  Warnings:

  - You are about to drop the column `legajo` on the `students` table. All the data in the column will be lost.
  - Added the required column `file` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "legajo",
ADD COLUMN     "file" INTEGER NOT NULL;
