

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Career } from "@prisma/client"
import { CareerService } from "../../src/services/career.service"
import { CareerWithRelations } from "../../src/types" 


class CareerServiceTest extends BaseServiceTest 
<typeof prismaMock.career, Career, CareerService, Prisma.CareerCreateInput, Prisma.CareerUpdateInput> {

    constructor(){
        super(prismaMock.career, CareerService)
    }

    public async findById(mockCareer : CareerWithRelations){

        this.mock.findUnique.mockResolvedValue(mockCareer)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockCareer)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const careerTest = new CareerServiceTest()


// mocks and input data

const mockCareerArray : Career[] = [
    {
        id: 1,
        name: "Ingeniería en Sistemas",
        code: 300,
        level: "Engineering",
        description: "An excelent career for the futuro",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockCareer : Career = {
    id: 1,
    name: "Ingeniería en Sistemas",
    code: 300,
    level: "Engineering",
    description: "An excelent career for the futuro",
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.CareerCreateInput = {
    name: "Ingeniería en Sistemas",
    code: 300,
    level: "Engineering",
    description: "An excelent career for the future"
}

const inputUpdate : Prisma.CareerUpdateInput = {
    name: "Ingeniería en Sistemas de Información",
    code: 400
}

const mockCareerWithRelations : CareerWithRelations = {
    id: 1,
    name: "Ingeniería en Sistemas",
    code: 300,
    level: "Engineering",
    description: "An excelent career for the futuro",
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    educationalOffers: [
        {
            id: 1,
            year: 2022,
            career_id: 1,
            faculty_id: 3,
            price: 0,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
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
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ],

    students: [
        {
            id: 1,
            user_id: 1,
            legajo: 10000,
            career_id: 1
        }
    ]
}


// tests


describe("Career service test", () => {

    test("should return a list with all careers", async () => {

        await careerTest.get(mockCareerArray)

    })

    test("should return one career with all relations", async () => {

        await careerTest.findById(mockCareerWithRelations)

    })

    test("should create a new career", async () => {

        await careerTest.create(mockCareer, inputCreate)

    })

    test("should update career data", async () => {

        await careerTest.update(mockCareer, inputUpdate)

    })


    test("should delete a career", async () => {

        await careerTest.delete(mockCareer)

    })


})