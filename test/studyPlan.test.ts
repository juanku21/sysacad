

import { BaseServiceTest } from "./utils/base-test"
import { prismaMock } from "../src/config/singleton"
import { Prisma } from "@prisma/client"
import { StudyPlan } from "@prisma/client"
import { StudyPlanService } from "../src/services/studyPlan.service"
import { StudyPlanWithRelations } from "../src/types" 


class StudyPlanServiceTest extends BaseServiceTest 
<typeof prismaMock.studyPlan, StudyPlan, StudyPlanService, Prisma.StudyPlanCreateInput, Prisma.StudyPlanUpdateInput> {

    constructor(){
        super(prismaMock.studyPlan, StudyPlanService)
    }

    public async findById(mockStudyPlan : StudyPlanWithRelations){

        this.mock.findUnique.mockResolvedValue(mockStudyPlan)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockStudyPlan)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const studyPlanTest = new StudyPlanServiceTest()


// mocks and input data

const mockStudyPlanArray : StudyPlan[] = [
    {
        id: 1,
        description: "Una excelente plan de estudios",
        effective_from: 2023,
        code: 800,
        duration: 5,
        careerId: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockStudyPlan : StudyPlan = {
    id: 1,
    description: "Una excelente plan de estudios",
    effective_from: 2023,
    code: 800,
    duration: 5,
    careerId: 1,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.StudyPlanCreateInput = {
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

const inputUpdate : Prisma.StudyPlanUpdateInput = {
    description: "Una excelentisimo plan de estudios",
    effective_from: 2024,
}

const mockStudyPlanWithRelations : StudyPlanWithRelations = {
    id: 1,
    description: "Una excelente plan de estudios",
    effective_from: 2023,
    code: 800,
    duration: 5,
    careerId: 1,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    subject_assignments: [
        {
            id: 1,
            hours: 4,
            type: "Yearly",
            subjectId: 6,
            study_plan_id: 1,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),

            subject: {
                id: 6,
                name: "Análisis 2",
                description: "Busca explicar conceptos matemáticos avanzados",
                code: 700,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            }
        }
    ],

    correlativities: [
        {
            id: 2,
            study_plan_id: 1,
            course: true,
            aprrove: false,
            subject_id: 6,
            correlativitie_id: 3,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ]

}


// tests


describe("Study plan service test", () => {

    test("should return a list with all study plans", async () => {

        await studyPlanTest.get(mockStudyPlanArray)

    })

    test("should return one study plan with all relations", async () => {

        await studyPlanTest.findById(mockStudyPlanWithRelations)

    })

    test("should create a new study plan", async () => {

        await studyPlanTest.create(mockStudyPlan, inputCreate)

    })

    test("should update study plan data", async () => {

        await studyPlanTest.update(mockStudyPlan, inputUpdate)

    })


    test("should delete a study plan", async () => {

        await studyPlanTest.delete(mockStudyPlan)

    })


})