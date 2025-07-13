/*
  Warnings:

  - You are about to drop the column `userId` on the `authorities` table. All the data in the column will be lost.
  - The primary key for the `authority-position` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorityId` on the `authority-position` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `authority-position` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `course_registrations` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `course_registrations` table. All the data in the column will be lost.
  - You are about to drop the column `careerId` on the `educational_offers` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `educational_offers` table. All the data in the column will be lost.
  - You are about to drop the column `universityId` on the `faculties` table. All the data in the column will be lost.
  - You are about to drop the column `examId` on the `final_exam_registrations` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `final_exam_registrations` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `final_exams` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `positions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `careerId` on the `study_plans` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `subjects_dictations` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `subjects_info` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `authorities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `authorities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authority_id` to the `authority-position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position_id` to the `authority-position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `correlativities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dicatation_id` to the `course_registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `course_registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `career_id` to the `educational_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculty_id` to the `educational_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university_id` to the `faculties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `final_exam_id` to the `final_exam_registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `final_exam_registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_info_id` to the `final_exams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `positions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `career_id` to the `study_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_info_id` to the `subjects_dictations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_id` to the `subjects_info` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeCorrelativie" AS ENUM ('Attend', 'TakeExam');

-- AlterEnum
ALTER TYPE "CourseState" ADD VALUE 'Attending';

-- AlterEnum
ALTER TYPE "ExamState" ADD VALUE 'NotTaken';

-- DropForeignKey
ALTER TABLE "authorities" DROP CONSTRAINT "authorities_userId_fkey";

-- DropForeignKey
ALTER TABLE "authority-position" DROP CONSTRAINT "authority-position_authorityId_fkey";

-- DropForeignKey
ALTER TABLE "authority-position" DROP CONSTRAINT "authority-position_positionId_fkey";

-- DropForeignKey
ALTER TABLE "course_registrations" DROP CONSTRAINT "course_registrations_studentId_fkey";

-- DropForeignKey
ALTER TABLE "course_registrations" DROP CONSTRAINT "course_registrations_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "educational_offers" DROP CONSTRAINT "educational_offers_careerId_fkey";

-- DropForeignKey
ALTER TABLE "educational_offers" DROP CONSTRAINT "educational_offers_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "faculties" DROP CONSTRAINT "faculties_universityId_fkey";

-- DropForeignKey
ALTER TABLE "final_exam_registrations" DROP CONSTRAINT "final_exam_registrations_examId_fkey";

-- DropForeignKey
ALTER TABLE "final_exam_registrations" DROP CONSTRAINT "final_exam_registrations_studentId_fkey";

-- DropForeignKey
ALTER TABLE "final_exams" DROP CONSTRAINT "final_exams_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "positions" DROP CONSTRAINT "positions_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_userId_fkey";

-- DropForeignKey
ALTER TABLE "study_plans" DROP CONSTRAINT "study_plans_careerId_fkey";

-- DropForeignKey
ALTER TABLE "subjects_dictations" DROP CONSTRAINT "subjects_dictations_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "subjects_info" DROP CONSTRAINT "subjects_info_subjectId_fkey";

-- DropIndex
DROP INDEX "authorities_userId_key";

-- DropIndex
DROP INDEX "students_userId_key";

-- AlterTable
ALTER TABLE "authorities" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "authority-position" DROP CONSTRAINT "authority-position_pkey",
DROP COLUMN "authorityId",
DROP COLUMN "positionId",
ADD COLUMN     "authority_id" INTEGER NOT NULL,
ADD COLUMN     "position_id" INTEGER NOT NULL,
ADD CONSTRAINT "authority-position_pkey" PRIMARY KEY ("authority_id", "position_id");

-- AlterTable
ALTER TABLE "correlativities" ADD COLUMN     "type" "TypeCorrelativie" NOT NULL;

-- AlterTable
ALTER TABLE "course_registrations" DROP COLUMN "studentId",
DROP COLUMN "subjectId",
ADD COLUMN     "dicatation_id" INTEGER NOT NULL,
ADD COLUMN     "student_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "educational_offers" DROP COLUMN "careerId",
DROP COLUMN "facultyId",
ADD COLUMN     "career_id" INTEGER NOT NULL,
ADD COLUMN     "faculty_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "faculties" DROP COLUMN "universityId",
ADD COLUMN     "university_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "final_exam_registrations" DROP COLUMN "examId",
DROP COLUMN "studentId",
ADD COLUMN     "final_exam_id" INTEGER NOT NULL,
ADD COLUMN     "student_id" INTEGER NOT NULL,
ALTER COLUMN "qualification" DROP NOT NULL;

-- AlterTable
ALTER TABLE "final_exams" DROP COLUMN "subject_id",
ADD COLUMN     "subject_info_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "positions" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "study_plans" DROP COLUMN "careerId",
ADD COLUMN     "career_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "subjects_dictations" DROP COLUMN "subject_id",
ADD COLUMN     "subject_info_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "subjects_info" DROP COLUMN "subjectId",
ADD COLUMN     "subject_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "authorities_user_id_key" ON "authorities"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_user_id_key" ON "students"("user_id");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorities" ADD CONSTRAINT "authorities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authority-position" ADD CONSTRAINT "authority-position_authority_id_fkey" FOREIGN KEY ("authority_id") REFERENCES "authorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authority-position" ADD CONSTRAINT "authority-position_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories-position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educational_offers" ADD CONSTRAINT "educational_offers_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educational_offers" ADD CONSTRAINT "educational_offers_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_plans" ADD CONSTRAINT "study_plans_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_registrations" ADD CONSTRAINT "course_registrations_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_registrations" ADD CONSTRAINT "course_registrations_dicatation_id_fkey" FOREIGN KEY ("dicatation_id") REFERENCES "subjects_dictations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_exam_registrations" ADD CONSTRAINT "final_exam_registrations_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_exam_registrations" ADD CONSTRAINT "final_exam_registrations_final_exam_id_fkey" FOREIGN KEY ("final_exam_id") REFERENCES "final_exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects_info" ADD CONSTRAINT "subjects_info_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_exams" ADD CONSTRAINT "final_exams_subject_info_id_fkey" FOREIGN KEY ("subject_info_id") REFERENCES "subjects_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects_dictations" ADD CONSTRAINT "subjects_dictations_subject_info_id_fkey" FOREIGN KEY ("subject_info_id") REFERENCES "subjects_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
