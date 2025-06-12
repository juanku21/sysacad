/*
  Warnings:

  - You are about to alter the column `tuition` on the `authorities` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `phone` on the `faculties` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "correlativities" DROP CONSTRAINT "correlativities_correlativitie_id_fkey";

-- DropForeignKey
ALTER TABLE "correlativities" DROP CONSTRAINT "correlativities_study_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "correlativities" DROP CONSTRAINT "correlativities_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "course_registrations" DROP CONSTRAINT "course_registrations_studentId_fkey";

-- DropForeignKey
ALTER TABLE "course_registrations" DROP CONSTRAINT "course_registrations_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "educational_offers" DROP CONSTRAINT "educational_offers_careerId_fkey";

-- DropForeignKey
ALTER TABLE "educational_offers" DROP CONSTRAINT "educational_offers_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "final_exam_registrations" DROP CONSTRAINT "final_exam_registrations_examId_fkey";

-- DropForeignKey
ALTER TABLE "final_exam_registrations" DROP CONSTRAINT "final_exam_registrations_studentId_fkey";

-- DropForeignKey
ALTER TABLE "final_exams" DROP CONSTRAINT "final_exams_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "qualifications" DROP CONSTRAINT "qualifications_student_id_fkey";

-- DropForeignKey
ALTER TABLE "qualifications" DROP CONSTRAINT "qualifications_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_career_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_userId_fkey";

-- DropForeignKey
ALTER TABLE "study_plans" DROP CONSTRAINT "study_plans_careerId_fkey";

-- DropForeignKey
ALTER TABLE "subjects_dictations" DROP CONSTRAINT "subjects_dictations_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "subjects_info" DROP CONSTRAINT "subjects_info_study_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "subjects_info" DROP CONSTRAINT "subjects_info_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "teachers_finals_exams" DROP CONSTRAINT "teachers_finals_exams_final_exam_id_fkey";

-- DropForeignKey
ALTER TABLE "teachers_finals_exams" DROP CONSTRAINT "teachers_finals_exams_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "teachers_subjects_dicatations" DROP CONSTRAINT "teachers_subjects_dicatations_dictation_id_fkey";

-- DropForeignKey
ALTER TABLE "teachers_subjects_dicatations" DROP CONSTRAINT "teachers_subjects_dicatations_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_facultyId_fkey";

-- AlterTable
ALTER TABLE "authorities" ALTER COLUMN "tuition" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "faculties" ALTER COLUMN "phone" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educational_offers" ADD CONSTRAINT "educational_offers_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educational_offers" ADD CONSTRAINT "educational_offers_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_plans" ADD CONSTRAINT "study_plans_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_registrations" ADD CONSTRAINT "course_registrations_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_registrations" ADD CONSTRAINT "course_registrations_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects_dictations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_exam_registrations" ADD CONSTRAINT "final_exam_registrations_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_exam_registrations" ADD CONSTRAINT "final_exam_registrations_examId_fkey" FOREIGN KEY ("examId") REFERENCES "final_exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects_info" ADD CONSTRAINT "subjects_info_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects_info" ADD CONSTRAINT "subjects_info_study_plan_id_fkey" FOREIGN KEY ("study_plan_id") REFERENCES "study_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correlativities" ADD CONSTRAINT "correlativities_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correlativities" ADD CONSTRAINT "correlativities_correlativitie_id_fkey" FOREIGN KEY ("correlativitie_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correlativities" ADD CONSTRAINT "correlativities_study_plan_id_fkey" FOREIGN KEY ("study_plan_id") REFERENCES "study_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qualifications" ADD CONSTRAINT "qualifications_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qualifications" ADD CONSTRAINT "qualifications_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_exams" ADD CONSTRAINT "final_exams_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers_finals_exams" ADD CONSTRAINT "teachers_finals_exams_final_exam_id_fkey" FOREIGN KEY ("final_exam_id") REFERENCES "final_exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers_finals_exams" ADD CONSTRAINT "teachers_finals_exams_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "authorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects_dictations" ADD CONSTRAINT "subjects_dictations_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers_subjects_dicatations" ADD CONSTRAINT "teachers_subjects_dicatations_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "authorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers_subjects_dicatations" ADD CONSTRAINT "teachers_subjects_dicatations_dictation_id_fkey" FOREIGN KEY ("dictation_id") REFERENCES "subjects_dictations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
