

import { Prisma, Career } from "@prisma/client"
import { CareerWithRelations } from "../../src/types"

export const mockCareerArray : Career[] = [
    {
        id: 1,
        name: "Ingeniería en Sistemas",
        code: 300,
        level: "Engineering",
        description: "An excelent career for the futuro",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockCareer : Career = {
    id: 1,
    name: "Ingeniería en Sistemas",
    code: 300,
    level: "Engineering",
    description: "An excelent career for the futuro",
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.CareerCreateInput = {
    name: "Ingeniería en Sistemas",
    code: 300,
    level: "Engineering",
    description: "An excelent career for the future"
}

export const inputUpdate : Prisma.CareerUpdateInput = {
    name: "Ingeniería en Sistemas de Información",
    code: 400
}

export const mockCareerWithRelations : CareerWithRelations = {
    id: 1,
    name: "Ingeniería en Sistemas",
    code: 300,
    level: "Engineering",
    description: "An excelent career for the futuro",
    createdAt: new Date(),
    updatedAt: new Date(),

    educationalOffers: [
        {
            id: 1,
            year: 2022,
            career_id: 1,
            faculty_id: 3,
            price: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],

    studyPlans: [
        {
            id: 1,
            code: 300,
            career_id: 1,
            effective_from: 2023,
            duration: 5,
            description: "El mejor plan de estudios",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],

    students: [
        {
            id: 1,
            user_id: 1,
            file: 10000,
            career_id: 1
        }
    ]
}