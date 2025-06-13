

import { BaseServiceTest } from "./utils/base-test"
import { prismaMock } from "../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Subject } from "@prisma/client"
import { SubjectService } from "../src/services/subject.service"
import { SubjectWithRelations } from "../src/types" 


class SubjectServiceTest extends BaseServiceTest 
<typeof prismaMock.subject, Subject, SubjectService, Prisma.SubjectCreateInput, Prisma.SubjectUpdateInput> {

    constructor(){
        super(prismaMock.subject, SubjectService)
    }

    public async findById(mockSubject : SubjectWithRelations){

        this.mock.findUnique.mockResolvedValue(mockSubject)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockSubject)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const subjectTest = new SubjectServiceTest()


// mocks and input data

const mockSubjectArray : Subject[] = [
    {
        id: 1,
        name: "Análisis Matemático I",
        code: 320,
        description: "Fundamentos matemáticos",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockSubject : Subject = {
    id: 1,
    name: "Análisis Matemático I",
    code: 320,
    description: "Fundamentos matemáticos",
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.SubjectCreateInput = {
    name: "Análisis Matemático I",
    code: 320,
    description: "Fundamentos matemáticos",
}

const inputUpdate : Prisma.SubjectUpdateInput = {
    name: "Análisis Numérico I",
}

const mockSubjectWithRelations : SubjectWithRelations = {
    id: 1,
    name: "Análisis Matemático I",
    code: 320,
    description: "Fundamentos matemáticos",
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    correlativities: [
        {
            id: 3,
            course: true,
            aprrove: false,
            subject_id: 1,
            correlativitie_id: 4,
            study_plan_id: 1,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),

            study_plan: {
                id: 1,
                description: "Una excelente plan de estudios",
                effective_from: 2023,
                code: 800,
                duration: 5,
                careerId: 1,
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
            }
        }
    ],

    required: [
        {
            id: 3,
            course: true,
            aprrove: false,
            subject_id: 1,
            correlativitie_id: 4,
            study_plan_id: 1,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),

            study_plan: {
                id: 1,
                description: "Una excelente plan de estudios",
                effective_from: 2023,
                code: 800,
                duration: 5,
                careerId: 1,
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
            }
        }
    ]

}


// tests


describe("Subject service test", () => {

    test("should return a list with all subjects", async () => {

        await subjectTest.get(mockSubjectArray)

    })

    test("should return one subject with all relations", async () => {

        await subjectTest.findById(mockSubjectWithRelations)

    })

    test("should create a new subject", async () => {

        await subjectTest.create(mockSubject, inputCreate)

    })

    test("should update subject data", async () => {

        await subjectTest.update(mockSubject, inputUpdate)

    })


    test("should delete a subject", async () => {

        await subjectTest.delete(mockSubject)

    })


})