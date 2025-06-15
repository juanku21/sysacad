

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Qualification } from "@prisma/client"
import { QualificationService } from "../../src/services/qualification.service"


class QualificationServiceTest extends BaseServiceTest 
<typeof prismaMock.qualification, Qualification, QualificationService, Prisma.QualificationCreateInput, Prisma.QualificationUpdateInput> {

    constructor(){
        super(prismaMock.qualification, QualificationService)
    }

    public async findById(mockQualification : Qualification){

        this.mock.findUnique.mockResolvedValue(mockQualification)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockQualification)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const qualificationTest = new QualificationServiceTest()


// mocks and input data

const mockQualificationArray : Qualification[] = [
    {
        id: 1,
        value: 10,
        student_id: 1,
        subject_id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockQualification : Qualification = {
    id: 1,
    value: 10,
    student_id: 1,
    subject_id: 1,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.QualificationCreateInput = {
    value: 10,

    student: {
        connect: {
            id: 1
        }
    },

    subject: {
        connect: {
            id: 1
        }
    }
}

const inputUpdate : Prisma.QualificationUpdateInput = {
    value: 9
}



// tests


describe("Qualification service test", () => {

    test("should return a list with all qualifications", async () => {

        await qualificationTest.get(mockQualificationArray)

    })

    test("should return one quealification", async () => {

        await qualificationTest.findById(mockQualification)

    })

    test("should create a new quealification", async () => {

        await qualificationTest.create(mockQualification, inputCreate)

    })

    test("should update qualification data", async () => {

        await qualificationTest.update(mockQualification, inputUpdate)

    })


    test("should delete a qualification", async () => {

        await qualificationTest.delete(mockQualification)

    })


})