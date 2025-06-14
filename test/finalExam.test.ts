

import { BaseServiceTest } from "./utils/base-test"
import { prismaMock } from "../src/config/singleton"
import { Prisma } from "@prisma/client"
import { FinalExam } from "@prisma/client"
import { FinalExamService } from "../src/services/finalExam.service"
import { FinalExamWithRelations } from "../src/types" 


class FinalExamServiceTest extends BaseServiceTest 
<typeof prismaMock.finalExam, FinalExam, FinalExamService, Prisma.FinalExamCreateInput, Prisma.FinalExamUpdateInput> {

    constructor(){
        super(prismaMock.finalExam, FinalExamService)
    }

    public async findById(mockFinalExam : FinalExamWithRelations){

        this.mock.findUnique.mockResolvedValue(mockFinalExam)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockFinalExam)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const finalExamTest = new FinalExamServiceTest()


// mocks and input data

const mockFinalExamArray : FinalExam[] = [
    {
        id: 2,
        date: expect.any(Date),
        classroom_id: null,
        subject_info_id: 4,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockFinalExam : FinalExam = {
    id: 2,
    date: expect.any(Date),
    classroom_id: null,
    subject_info_id: 4,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.FinalExamCreateInput = {
    date: expect.any(Date),

    subjectInfo: {
        connect: {
            id: 4
        }
    }
}

const inputUpdate : Prisma.FinalExamUpdateInput = {
    date: expect.any(Date),

    classroom: {
        connect: {
            id: 17
        }
    }
}

const mockFinalExamWithRelations : FinalExamWithRelations = {
    id: 2,
    date: expect.any(Date),
    classroom_id: null,
    subject_info_id: 4,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    subjectInfo: {
        id: 1,
        hours: 4,
        type: "Yearly",
        subject_id: 6,
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
    },

    registrations: [
        {
            id: 1,
            state: "Aprroved",
            qualification: 10,
            student_id: 3,
            final_exam_id: 2,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ],

    teacher: [
        {
            final_exam_id: 2,
            teacher_id: 1,

            teacher: {
                id: 1,
                user_id: 1,
                tuition: 32000,
                recruitment: expect.any(Date),

                user: {
                    id: 1,
                    name: "Martin",
                    last_name: "Montes",
                    email: "tinchomo@gmail.com",
                    password: "654321",
                    gender: "F",
                    cuil: 20727828372,
                    phone: 2618009675,
                    facultyId: 3,
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date)
                }
            }
        }
    ]

}


// tests


describe("Final Exam service test", () => {

    test("should return a list with all final exams", async () => {

        await finalExamTest.get(mockFinalExamArray)

    })

    test("should return one final exam with all relations", async () => {

        await finalExamTest.findById(mockFinalExamWithRelations)

    })

    test("should create a new final exam", async () => {

        await finalExamTest.create(mockFinalExam, inputCreate)

    })

    test("should update final exam data", async () => {

        await finalExamTest.update(mockFinalExam, inputUpdate)

    })


    test("should delete a final exam", async () => {

        await finalExamTest.delete(mockFinalExam)

    })


})