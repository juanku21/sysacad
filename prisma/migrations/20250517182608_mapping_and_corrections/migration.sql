/*
  Warnings:

  - You are about to drop the `Administrator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Career` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Correlativity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseRegistration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EducationalOffer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Faculty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FinalExam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FinalExamAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FinalExamRegistration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Qualification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudyPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubjectAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubjectDictation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubjectDictationAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- DropForeignKey
ALTER TABLE "Administrator" DROP CONSTRAINT "Administrator_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassRoom" DROP CONSTRAINT "ClassRoom_faculty_id_fkey";

-- DropForeignKey
ALTER TABLE "Correlativity" DROP CONSTRAINT "Correlativity_correlativitie_id_fkey";

-- DropForeignKey
ALTER TABLE "Correlativity" DROP CONSTRAINT "Correlativity_study_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "Correlativity" DROP CONSTRAINT "Correlativity_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "CourseRegistration" DROP CONSTRAINT "CourseRegistration_studentId_fkey";

-- DropForeignKey
ALTER TABLE "CourseRegistration" DROP CONSTRAINT "CourseRegistration_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "EducationalOffer" DROP CONSTRAINT "EducationalOffer_careerId_fkey";

-- DropForeignKey
ALTER TABLE "EducationalOffer" DROP CONSTRAINT "EducationalOffer_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "FinalExam" DROP CONSTRAINT "FinalExam_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "FinalExam" DROP CONSTRAINT "FinalExam_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "FinalExamAssignment" DROP CONSTRAINT "FinalExamAssignment_final_exam_id_fkey";

-- DropForeignKey
ALTER TABLE "FinalExamAssignment" DROP CONSTRAINT "FinalExamAssignment_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "FinalExamRegistration" DROP CONSTRAINT "FinalExamRegistration_examId_fkey";

-- DropForeignKey
ALTER TABLE "FinalExamRegistration" DROP CONSTRAINT "FinalExamRegistration_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Qualification" DROP CONSTRAINT "Qualification_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Qualification" DROP CONSTRAINT "Qualification_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_career_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_id_fkey";

-- DropForeignKey
ALTER TABLE "StudyPlan" DROP CONSTRAINT "StudyPlan_careerId_fkey";

-- DropForeignKey
ALTER TABLE "SubjectAssignment" DROP CONSTRAINT "SubjectAssignment_study_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "SubjectAssignment" DROP CONSTRAINT "SubjectAssignment_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "SubjectDictation" DROP CONSTRAINT "SubjectDictation_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "SubjectDictation" DROP CONSTRAINT "SubjectDictation_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "SubjectDictationAssignment" DROP CONSTRAINT "SubjectDictationAssignment_dictation_id_fkey";

-- DropForeignKey
ALTER TABLE "SubjectDictationAssignment" DROP CONSTRAINT "SubjectDictationAssignment_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_facultyId_fkey";

-- DropTable
DROP TABLE "Administrator";

-- DropTable
DROP TABLE "Career";

-- DropTable
DROP TABLE "ClassRoom";

-- DropTable
DROP TABLE "Correlativity";

-- DropTable
DROP TABLE "CourseRegistration";

-- DropTable
DROP TABLE "EducationalOffer";

-- DropTable
DROP TABLE "Faculty";

-- DropTable
DROP TABLE "FinalExam";

-- DropTable
DROP TABLE "FinalExamAssignment";

-- DropTable
DROP TABLE "FinalExamRegistration";

-- DropTable
DROP TABLE "Qualification";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "StudyPlan";

-- DropTable
DROP TABLE "Subject";

-- DropTable
DROP TABLE "SubjectAssignment";

-- DropTable
DROP TABLE "SubjectDictation";

-- DropTable
DROP TABLE "SubjectDictationAssignment";

-- DropTable
DROP TABLE "Teacher";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cuil" BIGINT NOT NULL,
    "gender" "Gender",
    "phone" BIGINT NOT NULL,
    "facultyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "legajo" INTEGER NOT NULL,
    "career_id" INTEGER NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tuition" BIGINT NOT NULL,
    "specialty" TEXT,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administrators" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "area" TEXT NOT NULL,
    "position" TEXT,

    CONSTRAINT "administrators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "universities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,

    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faculties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT,
    "street" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "phone" BIGINT NOT NULL,
    "web" TEXT,
    "cityId" INTEGER NOT NULL,
    "universityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faculties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educational_offers" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "facultyId" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educational_offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "careers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "careers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_plans" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "effective_from" INTEGER NOT NULL,
    "code" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "study_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_registrations" (
    "id" SERIAL NOT NULL,
    "state" "CourseState" NOT NULL,
    "studentId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "final_exam_registrations" (
    "id" SERIAL NOT NULL,
    "qualification" INTEGER NOT NULL,
    "state" "ExamState" NOT NULL,
    "studentId" INTEGER NOT NULL,
    "examId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "final_exam_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects_info" (
    "id" SERIAL NOT NULL,
    "hours" INTEGER NOT NULL,
    "type" "SubjectType" NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "study_plan_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correlativities" (
    "id" SERIAL NOT NULL,
    "course" BOOLEAN NOT NULL,
    "aprrove" BOOLEAN NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "correlativitie_id" INTEGER NOT NULL,
    "study_plan_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "correlativities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qualifications" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qualifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "final_exams" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "classroom_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "final_exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers_finals_exams" (
    "final_exam_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,

    CONSTRAINT "teachers_finals_exams_pkey" PRIMARY KEY ("final_exam_id","teacher_id")
);

-- CreateTable
CREATE TABLE "subjects_dictations" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "classroom_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_dictations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers_subjects_dicatations" (
    "teacher_id" INTEGER NOT NULL,
    "dictation_id" INTEGER NOT NULL,

    CONSTRAINT "teachers_subjects_dicatations_pkey" PRIMARY KEY ("teacher_id","dictation_id")
);

-- CreateTable
CREATE TABLE "class_rooms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "projector" BOOLEAN,
    "board" BOOLEAN,
    "air_conditioning" BOOLEAN,
    "heating" BOOLEAN,
    "wifi" BOOLEAN,
    "faculty_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cuil_key" ON "users"("cuil");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "students_userId_key" ON "students"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_userId_key" ON "teachers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "administrators_userId_key" ON "administrators"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "faculties_email_key" ON "faculties"("email");

-- CreateIndex
CREATE UNIQUE INDEX "faculties_phone_key" ON "faculties"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "careers_code_key" ON "careers"("code");

-- CreateIndex
CREATE UNIQUE INDEX "study_plans_code_key" ON "study_plans"("code");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_code_key" ON "subjects"("code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "administrators" ADD CONSTRAINT "administrators_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educational_offers" ADD CONSTRAINT "educational_offers_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "educational_offers" ADD CONSTRAINT "educational_offers_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "study_plans" ADD CONSTRAINT "study_plans_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "course_registrations" ADD CONSTRAINT "course_registrations_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_registrations" ADD CONSTRAINT "course_registrations_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects_dictations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_exam_registrations" ADD CONSTRAINT "final_exam_registrations_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_exam_registrations" ADD CONSTRAINT "final_exam_registrations_examId_fkey" FOREIGN KEY ("examId") REFERENCES "final_exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects_info" ADD CONSTRAINT "subjects_info_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "subjects_info" ADD CONSTRAINT "subjects_info_study_plan_id_fkey" FOREIGN KEY ("study_plan_id") REFERENCES "study_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correlativities" ADD CONSTRAINT "correlativities_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "correlativities" ADD CONSTRAINT "correlativities_correlativitie_id_fkey" FOREIGN KEY ("correlativitie_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "correlativities" ADD CONSTRAINT "correlativities_study_plan_id_fkey" FOREIGN KEY ("study_plan_id") REFERENCES "study_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qualifications" ADD CONSTRAINT "qualifications_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qualifications" ADD CONSTRAINT "qualifications_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "final_exams" ADD CONSTRAINT "final_exams_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects_info"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "final_exams" ADD CONSTRAINT "final_exams_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "class_rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers_finals_exams" ADD CONSTRAINT "teachers_finals_exams_final_exam_id_fkey" FOREIGN KEY ("final_exam_id") REFERENCES "final_exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers_finals_exams" ADD CONSTRAINT "teachers_finals_exams_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "subjects_dictations" ADD CONSTRAINT "subjects_dictations_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects_info"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "subjects_dictations" ADD CONSTRAINT "subjects_dictations_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "class_rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers_subjects_dicatations" ADD CONSTRAINT "teachers_subjects_dicatations_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "teachers_subjects_dicatations" ADD CONSTRAINT "teachers_subjects_dicatations_dictation_id_fkey" FOREIGN KEY ("dictation_id") REFERENCES "subjects_dictations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_rooms" ADD CONSTRAINT "class_rooms_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
