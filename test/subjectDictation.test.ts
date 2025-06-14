


import { BaseServiceTest } from "./utils/base-test"
import { prismaMock } from "../src/config/singleton"
import { Prisma } from "@prisma/client"
import { SubjectDictation } from "@prisma/client"
import { SubjectDictationService } from "../src/services/subjectDictation.service"
import { SubjectDictationWithRelations } from "../src/types" 


class SubjectDictationServiceTest extends BaseServiceTest 
<typeof prismaMock.subjectDictation, SubjectDictation, SubjectDictationService, Prisma.SubjectDictationCreateInput, Prisma.SubjectDictationUpdateInput> {

    constructor(){
        super(prismaMock.subjectDictation, SubjectDictationService)
    }

    public async findById(mockSubjectDictation : SubjectDictationWithRelations){

        this.mock.findUnique.mockResolvedValue(mockSubjectDictation)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockSubjectDictation)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const subjectDictationTest = new SubjectDictationServiceTest()


// mocks and input data

const mockSubjectDictationArray : SubjectDictation[] = [
    {
        id: 1,
        year: 2019,
        subject_id: 1,
        classroom_id: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockSubjectDictation : SubjectDictation = {
    id: 1,
    year: 2019,
    subject_id: 1,
    classroom_id: null,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.SubjectDictationCreateInput = {
    year: 2019,

    subject: {
        connect: {
            id: 1
        }
    }
}

const inputUpdate : Prisma.SubjectDictationUpdateInput = {
    year: 2020
}

const mockSubjectDictationWithRelations : SubjectDictationWithRelations = {
    id: 1,
    year: 2019,
    subject_id: 1,
    classroom_id: null,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    registrations: [
        {
            id: 1,
            state: "Attending",
            studentId: 1,
            dicatationId: 4,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ],

    teacher: [
        {
            dictation_id: 1,
            teacher_id: 1,

            teacher: {
                id: 1,
                userId: 1,
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
    ],

    subject: {
        id: 1,
        hours: 4,
        type: "Yearly",
        subjectId: 2,
        study_plan_id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
}


// tests


describe("Subject Dictation service test", () => {

    test("should return a list with all subject dictations info", async () => {

        await subjectDictationTest.get(mockSubjectDictationArray)

    })

    test("should return one subject dictation with all relations", async () => {

        await subjectDictationTest.findById(mockSubjectDictationWithRelations)

    })

    test("should create a new subject dictation", async () => {

        await subjectDictationTest.create(mockSubjectDictation, inputCreate)

    })

    test("should update subject dictation data", async () => {

        await subjectDictationTest.update(mockSubjectDictation, inputUpdate)

    })


    test("should delete a subject dictation", async () => {

        await subjectDictationTest.delete(mockSubjectDictation)

    })


})