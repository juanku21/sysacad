

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { SubjectInfo } from "@prisma/client"
import { SubjectInfoService } from "../../src/services/subjectInfo.service"
import { SubjectInfoWithRelations } from "../../src/types" 


class SubjectInfoServiceTest extends BaseServiceTest 
<typeof prismaMock.subjectInfo, SubjectInfo, SubjectInfoService, Prisma.SubjectInfoCreateInput, Prisma.SubjectInfoUpdateInput> {

    constructor(){
        super(prismaMock.subjectInfo, SubjectInfoService)
    }

    public async findById(mockSubjectInfo : SubjectInfoWithRelations){

        this.mock.findUnique.mockResolvedValue(mockSubjectInfo)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockSubjectInfo)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const subjectInfoTest = new SubjectInfoServiceTest()


// mocks and input data

const mockSubjectInfoArray : SubjectInfo[] = [
    {
        id: 1,
        hours: 4,
        type: "Yearly",
        subject_id: 2,
        study_plan_id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockSubjectInfo : SubjectInfo = {
    id: 1,
    hours: 4,
    type: "Yearly",
    subject_id: 2,
    study_plan_id: 1,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.SubjectInfoCreateInput = {
    hours: 4,
    type: "Yearly",

    subject: {
        connect: {
            id: 2
        }
    },

    studyPlan: {
        connect: {
            id: 1
        }
    }
}

const inputUpdate : Prisma.SubjectInfoUpdateInput = {
    hours: 8,
    type: "HalfYearly"
}

const mockSubjectInfoWithRelations : SubjectInfoWithRelations = {
    id: 1,
    hours: 4,
    type: "Yearly",
    subject_id: 2,
    study_plan_id: 1,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    dictation: [
        {
            id: 1,
            year: 2019,
            subject_info_id: 1,
            classroom_id: null,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ],

    finalExam: [
        {
            id: 1,
            date: expect.any(Date),
            subject_info_id: 1,
            classroom_id: null,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ],

    subject: {
        id: 1,
        name: "Análisis Matemático I",
        code: 320,
        description: "Fundamentos matemáticos",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
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
    }
}


// tests


describe("Subject Info service test", () => {

    test("should return a list with all subjects info", async () => {

        await subjectInfoTest.get(mockSubjectInfoArray)

    })

    test("should return one subject info with all relations", async () => {

        await subjectInfoTest.findById(mockSubjectInfoWithRelations)

    })

    test("should create a new subject info", async () => {

        await subjectInfoTest.create(mockSubjectInfo, inputCreate)

    })

    test("should update subject info data", async () => {

        await subjectInfoTest.update(mockSubjectInfo, inputUpdate)

    })


    test("should delete a subject info", async () => {

        await subjectInfoTest.delete(mockSubjectInfo)

    })


})