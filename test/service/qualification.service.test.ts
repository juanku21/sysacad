

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Qualification } from "@prisma/client"
import { QualificationService } from "../../src/services/qualification.service"
import { 
    mockQualification, 
    mockQualificationArray,
    inputCreate,
    inputUpdate
 } from "../mocks/qualification.mock"


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