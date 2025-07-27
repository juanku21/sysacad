
import { Prisma, EducationalOffer } from "@prisma/client"
import { EducationalOfferWithRelations } from "../../src/types"

export const mockEducationalOfferArray : EducationalOffer[] = [
    {
        id: 1,
        year: 2022,
        price: 0,
        faculty_id: 1,
        career_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockEducationalOffer : EducationalOffer = {
    id: 1,
    year: 2022,
    price: 0,
    faculty_id: 1,
    career_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.EducationalOfferCreateInput = {
    year: 2022,
    price: 0,

    faculty: {
        connect: {
            id: 1
        }
    },

    career: {
        connect: {
            id: 1
        }
    }
}

export const inputUpdate : Prisma.EducationalOfferUpdateInput = {
    price: 1000
}

export const mockEducationalOfferWithRelations : EducationalOfferWithRelations = {
    id: 1,
    year: 2022,
    price: 0,
    faculty_id: 1,
    career_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),

    career: {
        id: 1,
        name: "Ingeniería en Sistemas",
        code: 540,
        description: "La carrera del futuro",
        level: "Engineering",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}
