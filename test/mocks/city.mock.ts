
import { Prisma, City } from "@prisma/client"
import { CityWithRelations } from "../../src/types"

export const mockCityArray : City[] = [
    {
        id: 1,
        name: 'Mendoza',
        zip_code: "5500",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockCity : City = {
    id: 1,
    name: 'Mendoza',
    zip_code: "5500",
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.CityCreateInput = {
    name: 'Mendoza',
    zip_code: "5500"
}

export const inputUpdate : Prisma.CityUpdateInput = {
    zip_code: "5520"
}

export const mockCityWithRelations : CityWithRelations = {
    id: 1,
    name: 'Mendoza',
    zip_code: "5500",
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
            phone: 8327323,
            web: null,
            university_id: 1,
            cityId: 50,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]
}
