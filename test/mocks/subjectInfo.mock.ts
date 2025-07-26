
import { Prisma, SubjectInfo } from "@prisma/client"
import { SubjectInfoWithRelations } from "../../src/types"

export const mockSubjectInfoArray : SubjectInfo[] = [
    {
        id: 1,
        hours: 4,
        type: "Yearly",
        subject_id: 2,
        study_plan_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockSubjectInfo : SubjectInfo = {
    id: 1,
    hours: 4,
    type: "Yearly",
    subject_id: 2,
    study_plan_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.SubjectInfoCreateInput = {
    hours: 4,
    type: "Yearly",

    subject: {
        connect: {
            id: 2
        }
    },

    studyPlan: {
        connect: {
            id: 1
        }
    }
}

export const inputUpdate : Prisma.SubjectInfoUpdateInput = {
    hours: 8,
    type: "HalfYearly"
}

export const mockSubjectInfoWithRelations : SubjectInfoWithRelations = {
    id: 1,
    hours: 4,
    type: "Yearly",
    subject_id: 2,
    study_plan_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),

    dictation: [
        {
            id: 1,
            year: 2019,
            subject_info_id: 1,
            classroom_id: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],

    finalExam: [
        {
            id: 1,
            date: new Date(),
            subject_info_id: 1,
            classroom_id: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],

    subject: {
        id: 1,
        name: "Análisis Matemático I",
        code: 320,
        description: "Fundamentos matemáticos",
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    studyPlan: {
        id: 1,
        description: "Una excelente plan de estudios",
        effective_from: 2023,
        code: 800,
        duration: 5,
        career_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),

        career: {
            id: 1,
            name: "Ingeniería en Sistemas",
            code: 300,
            level: "Engineering",
            description: "An excelent career for the futuro",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
}
