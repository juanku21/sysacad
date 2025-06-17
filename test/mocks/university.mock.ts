
import { Prisma, University } from "@prisma/client"
import { UniversityWithRelations } from "../../src/types"

export const mockUniversityArray : University[] = [
    {
        id: 1,
        name: 'Universidad Tecnológica Nacional',
        acronym: "UTN",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockUniversity : University = {
    id: 1,
    name: 'Universidad Tecnológica Nacional',
    acronym: "UTN",
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.UniversityCreateInput = {
    name: 'Universidad Tecnológica Nacional',
    acronym: "UTN"
}

export const inputUpdate : Prisma.UniversityUpdateInput = {
    name: 'Universidad Tecnológica Nacional',
    acronym: "UTN"
}

export const mockUniversityWithRelations : UniversityWithRelations = {
    id: 1,
    name: 'Universidad Tecnológica Nacional',
    acronym: "UTN",
    createdAt: new Date(),
    updatedAt: new Date(),
    faculty: [
        {
            id: 1,
            name: "Facultad Regional San Rafael",
            code: 25,
            description: null,
            street: "Urquiza",
            number: 876,
            email: "utnfrsr@mail.com",
            phone: 26045670983,
            web: null,
            university_id: 1,
            cityId: 50,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]
}
