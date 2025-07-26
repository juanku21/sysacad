
import { Prisma, Correlativity } from "@prisma/client"
import { CorrelativityWithRelations } from "../../src/types"

export const mockCorrelativityArray : Correlativity[] = [
    {
        id: 3,
        course: true,
        aprrove: false,
        subject_id: 1,
        correlativitie_id: 4,
        type: "Attend",
        study_plan_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockCorrelativity : Correlativity = {
    id: 3,
    course: true,
    aprrove: false,
    subject_id: 1,
    correlativitie_id: 4,
    type: "Attend",
    study_plan_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.CorrelativityCreateInput = {
    course: true,
    aprrove: false,
    type: "Attend",

    subject: {
        connect: {
            id: 1
        }
    },

    correlativity: {
        connect: {
            id: 4
        }
    },

    studyPlan: {
        connect: {
            id: 1
        }
    }

}

export const inputUpdate : Prisma.CorrelativityUpdateInput = {
    course: true,
    aprrove: true,
    type: "TakeExam"
}

export const mockCorrelativityWithRelations : CorrelativityWithRelations = {
    id: 3,
    course: true,
    aprrove: false,
    subject_id: 1,
    correlativitie_id: 4,
    type: "Attend",
    study_plan_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),

    subject: {
        id: 1,
        name: "Análisis Matemático I",
        code: 320,
        description: "Fundamentos matemáticos",
        createdAt: new Date(),
        updatedAt: new Date()
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
    },

    correlativity: {
        id: 4,
        name: "Física II",
        code: 320,
        description: "Contenidos de física más avanzados",
        createdAt: new Date(),
        updatedAt: new Date()
    }

}