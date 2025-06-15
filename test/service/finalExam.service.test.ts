

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { FinalExam } from "@prisma/client"
import { FinalExamService } from "../../src/services/finalExam.service"
import { FinalExamWithRelations } from "../../src/types" 
import { 
    mockFinalExam, 
    mockFinalExamWithRelations, 
    mockFinalExamArray,
    inputCreate,
    inputUpdate
 } from "../mocks/finalExam.mock"


 
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