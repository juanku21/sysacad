

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Correlativity } from "@prisma/client"
import { CorrelativityService } from "../../src/services/correlativity.service"
import { CorrelativityWithRelations } from "../../src/types" 


class CorrelativityServiceTest extends BaseServiceTest 
<typeof prismaMock.correlativity, Correlativity, CorrelativityService, Prisma.CorrelativityCreateInput, Prisma.CorrelativityUpdateInput> {

    constructor(){
        super(prismaMock.correlativity, CorrelativityService)
    }

    public async findById(mockCorrelativity : CorrelativityWithRelations){

        this.mock.findUnique.mockResolvedValue(mockCorrelativity)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockCorrelativity)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const correlativityTest = new CorrelativityServiceTest()


// mocks and input data

const mockCorrelativityArray : Correlativity[] = [
    {
        id: 3,
        course: true,
        aprrove: false,
        subject_id: 1,
        correlativitie_id: 4,
        type: "Attend",
        study_plan_id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockCorrelativity : Correlativity = {
    id: 3,
    course: true,
    aprrove: false,
    subject_id: 1,
    correlativitie_id: 4,
    type: "Attend",
    study_plan_id: 1,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.CorrelativityCreateInput = {
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

const inputUpdate : Prisma.CorrelativityUpdateInput = {
    course: true,
    aprrove: true,
    type: "TakeExam"
}

const mockCorrelativityWithRelations : CorrelativityWithRelations = {
    id: 3,
    course: true,
    aprrove: false,
    subject_id: 1,
    correlativitie_id: 4,
    type: "Attend",
    study_plan_id: 1,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    subject: {
        id: 1,
        name: "Análisis Matemático I",
        code: 320,
        description: "Fundamentos matemáticos",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    },

    studyPlan: {
        id: 1,
        description: "Una excelente plan de estudios",
        effective_from: 2023,
        code: 800,
        duration: 5,
        career_id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),

        career: {
            id: 1,
            name: "Ingeniería en Sistemas",
            code: 300,
            level: "Engineering",
            description: "An excelent career for the futuro",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    },

    correlativity: {
        id: 4,
        name: "Física II",
        code: 320,
        description: "Contenidos de física más avanzados",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }

}


// tests

describe("Correlativity service test", () => {

    test("should return a list with all correlativities info", async () => {

        await correlativityTest.get(mockCorrelativityArray)

    })

    test("should return one correlativity info with all relations", async () => {

        await correlativityTest.findById(mockCorrelativityWithRelations)

    })

    test("should create a new correlativity info", async () => {

        await correlativityTest.create(mockCorrelativity, inputCreate)

    })

    test("should update correlativity info data", async () => {

        await correlativityTest.update(mockCorrelativity, inputUpdate)

    })


    test("should delete a correlativity info", async () => {

        await correlativityTest.delete(mockCorrelativity)

    })


})