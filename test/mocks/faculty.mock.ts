
import { Prisma, Faculty } from "@prisma/client"
import { FacultyWithRelations } from "../../src/types"

export const mockFacultyArray : Faculty[] = [
    {
        id: 1,
        name: "FRSR",
        code: 500,
        description: null,
        email: "utnfrsr@gmail.com",
        phone: 2609876543,
        street: "Urquiza",
        number: 100,
        cityId: 5,
        university_id: 1,
        web: null,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockFaculty : Faculty = {
    id: 1,
    name: "FRSR",
    code: 500,
    description: null,
    email: "utnfrsr@gmail.com",
    phone: 2609876543,
    street: "Urquiza",
    number: 100,
    cityId: 5,
    university_id: 1,
    web: null,
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.FacultyCreateInput = {

    name: "FRSR",
    code: 500,
    email: "utnfrsr@gmail.com",
    phone: 2609876543,
    street: "Urquiza",
    number: 100,

    city: {
        connect: {
            id: 5
        }
    },

    university: {
        connect: {
            id: 1
        }
    }

}

export const inputUpdate : Prisma.FacultyUpdateInput = {
    
    street: "San Martin",
    number: 123,

    city: {
        update: {
            id: 2
        }
    }

}


export const mockFacultyWithRelations : FacultyWithRelations = {
    id: 1,
    name: "FRSR",
    code: 500,
    description: null,
    email: "utnfrsr@gmail.com",
    phone: 2609876543,
    street: "Urquiza",
    number: 100,
    cityId: 5,
    university_id: 1,
    web: null,
    createdAt: new Date(),
    updatedAt: new Date(),

    university: {
        id: 1,
        name: 'Universidad Tecnológica Nacional',
        acronym: "UTN",
        createdAt: new Date(),
        updatedAt: new Date()
    },

    city: {
        id: 5,
        name: "San Rafael",
        zip_code: "5600",
        createdAt: new Date(),
        updatedAt: new Date()
    },

    educationalOffers: [
        {
            id: 1,
            year: 2022,
            career_id: 5,
            price: 0,
            faculty_id: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]
}