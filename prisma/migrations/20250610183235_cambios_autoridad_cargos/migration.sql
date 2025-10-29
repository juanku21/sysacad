/*
  Warnings:

  - You are about to drop the `administrators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teachers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "administrators" DROP CONSTRAINT "administrators_userId_fkey";

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_userId_fkey";

-- DropForeignKey
ALTER TABLE "teachers_finals_exams" DROP CONSTRAINT "teachers_finals_exams_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "teachers_subjects_dicatations" DROP CONSTRAINT "teachers_subjects_dicatations_teacher_id_fkey";

-- DropTable
DROP TABLE "administrators";

-- DropTable
DROP TABLE "teachers";

-- CreateTable
CREATE TABLE "authorities" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tuition" BIGINT NOT NULL,
    "recruitment" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authorities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authority-position" (
    "authorityId" INTEGER NOT NULL,
    "positionId" INTEGER NOT NULL,

    CONSTRAINT "authority-position_pkey" PRIMARY KEY ("authorityId","positionId")
);

-- CreateTable
CREATE TABLE "positions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "puntaje" DOUBLE PRECISION NOT NULL,
    "area" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories-position" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories-position_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authorities_userId_key" ON "authorities"("userId");

-- AddForeignKey
ALTER TABLE "authorities" ADD CONSTRAINT "authorities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authority-position" ADD CONSTRAINT "authority-position_authorityId_fkey" FOREIGN KEY ("authorityId") REFERENCES "authorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authority-position" ADD CONSTRAINT "authority-position_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories-position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers_finals_exams" ADD CONSTRAINT "teachers_finals_exams_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "authorities"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "teachers_subjects_dicatations" ADD CONSTRAINT "teachers_subjects_dicatations_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "authorities"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
