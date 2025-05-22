
import { Prisma } from "@prisma/client";


export type CareerWithRelations = Prisma.CareerGetPayload<{
    include: {
        educational_offers: true,
        study_plans: true,
        students: true
    }
}>

export type ClassRoomWithRelations = Prisma.ClassRoomGetPayload<{
    include: {
        subject_dictatios: true,
        final_exams: true
    }
}>

export type FacultyWithRelations = Prisma.FacultyGetPayload<{
    include: {
        users: true,
        class_rooms: true,
        educational_offers: true
    }
}>

export type FinalExamWithRelations = Prisma.FinalExamGetPayload<{
    include: {
        assignments: true,
        registrations: true
    }
}>

export type StudyPlanWithRelations = Prisma.StudyPlanGetPayload<{
    include: {
        subject_assignments: true,
        correlativities: true
    }
}> 

export type SubjectWithRelations = Prisma.SubjectGetPayload<{
    include: {
        assignments: true,
        correlativities: true,
        quealifications: true,
        required: true
    }
}>

export type SubjectDictationWithRelations = Prisma.SubjectDictationGetPayload<{
    include: {
        registrations: true,
        assigments: true
    }
}>

export type UniversityWithRelations = Prisma.UniversityGetPayload<{
    include: {
        faculty: true
    }
}>