
import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { FinalExamRegistration } from "@prisma/client"
import { FinalExamRegistrationService } from "../../src/services/finalExamRegistration.service"
import { FinalExamRegistrationWithRelations } from "../../src/types"
import { 
    mockFinalExamRegistration, 
    mockFinalExamRegistrationWithRelations, 
    mockFinalExamRegistrationArray,
    inputCreate,
    inputUpdate
 } from "../mocks/finalExamRegistration.mock"


class FinalExamRegistrationServiceTest extends BaseServiceTest 
<typeof prismaMock.finalExamRegistration, FinalExamRegistration, FinalExamRegistrationService, Prisma.FinalExamRegistrationCreateInput, Prisma.FinalExamRegistrationUpdateInput> {

    constructor(){
        super(prismaMock.finalExamRegistration, FinalExamRegistrationService)
    }

    public async findById(mockFinalExamRegistration : FinalExamRegistrationWithRelations){

        this.mock.findUnique.mockResolvedValue(mockFinalExamRegistration)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockFinalExamRegistration)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const finalExamRegistrationTest = new FinalExamRegistrationServiceTest()


// tests


describe("Final Exam Registration service test", () => {

    test("should return a list with all final exam registrations", async () => {

        await finalExamRegistrationTest.get(mockFinalExamRegistrationArray)

    })

    test("should return one final exam registration with all relations", async () => {

        await finalExamRegistrationTest.findById(mockFinalExamRegistrationWithRelations)

    })

    test("should create a new final exam registration", async () => {

        await finalExamRegistrationTest.create(mockFinalExamRegistration, inputCreate)

    })

    test("should update final exam registration data", async () => {

        await finalExamRegistrationTest.update(mockFinalExamRegistration, inputUpdate)

    })


    test("should delete a final exam registration", async () => {

        await finalExamRegistrationTest.delete(mockFinalExamRegistration)

    })


})