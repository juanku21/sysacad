
import { Prisma, Subject } from "@prisma/client"
import { SubjectWithRelations } from "../../src/types"

export const mockSubjectArray : Subject[] = [
    {
        id: 1,
        name: "Análisis Matemático I",
        code: 320,
        description: "Fundamentos matemáticos",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockSubject : Subject = {
    id: 1,
    name: "Análisis Matemático I",
    code: 320,
    description: "Fundamentos matemáticos",
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.SubjectCreateInput = {
    name: "Análisis Matemático I",
    code: 320,
    description: "Fundamentos matemáticos",
}

export const inputUpdate : Prisma.SubjectUpdateInput = {
    name: "Análisis Numérico I",
}

export const mockSubjectWithRelations : SubjectWithRelations = {
    id: 1,
    name: "Análisis Matemático I",
    code: 320,
    description: "Fundamentos matemáticos",
    createdAt: new Date(),
    updatedAt: new Date(),

    correlativities: [
        {
            id: 3,
            course: true,
            aprrove: false,
            subject_id: 1,
            correlativitie_id: 4,
            type: "TakeExam",
            study_plan_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),

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
    ],

    required: [
        {
            id: 3,
            course: true,
            aprrove: false,
            subject_id: 1,
            correlativitie_id: 4,
            type: "TakeExam",
            study_plan_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),

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
    ]

}