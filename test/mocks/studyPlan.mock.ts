
import { Prisma, StudyPlan } from "@prisma/client"
import { StudyPlanWithRelations } from "../../src/types"

export const mockStudyPlanArray : StudyPlan[] = [
    {
        id: 1,
        description: "Una excelente plan de estudios",
        effective_from: 2023,
        code: 800,
        duration: 5,
        career_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockStudyPlan : StudyPlan = {
    id: 1,
    description: "Una excelente plan de estudios",
    effective_from: 2023,
    code: 800,
    duration: 5,
    career_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.StudyPlanCreateInput = {
    description: "Una excelente plan de estudios",
    effective_from: 2023,
    code: 800,
    duration: 5,

    career: {
        connect: {
            id: 1
        }
    }
}

export const inputUpdate : Prisma.StudyPlanUpdateInput = {
    description: "Una excelentisimo plan de estudios",
    effective_from: 2024,
}

export const mockStudyPlanWithRelations : StudyPlanWithRelations = {
    id: 1,
    description: "Una excelente plan de estudios",
    effective_from: 2023,
    code: 800,
    duration: 5,
    career_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),

    subjectInfo: [
        {
            id: 1,
            hours: 4,
            type: "Yearly",
            subject_id: 6,
            study_plan_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),

            subject: {
                id: 6,
                name: "Análisis 2",
                description: "Busca explicar conceptos matemáticos avanzados",
                code: 700,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }
    ],

    correlativities: [
        {
            id: 2,
            study_plan_id: 1,
            course: true,
            type: "TakeExam",
            aprrove: false,
            subject_id: 6,
            correlativitie_id: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],

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