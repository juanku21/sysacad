
import { BaseServiceTest } from "./utils/base-test"
import { prismaMock } from "../src/config/singleton"
import { Prisma } from "@prisma/client"
import { FinalExamRegistration } from "@prisma/client"
import { FinalExamRegistrationService } from "../src/services/finalExamRegistration.service"
import { FinalExamRegistrationWithRelations } from "../src/types" 


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


// mocks and input data

const mockFinalExamRegistrationArray : FinalExamRegistration[] = [
    {
        id: 1,
        state: "Aprroved",
        qualification: 10,
        student_id: 3,
        final_exam_id: 2,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockFinalExamRegistration : FinalExamRegistration = {
    id: 1,
    state: "Aprroved",
    qualification: 10,
    student_id: 3,
    final_exam_id: 2,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.FinalExamRegistrationCreateInput = {
    qualification: null,
    state: "NotTaken",

    student: {
        connect: {
            id: 3
        }
    },

    exam: {
        connect: {
            id: 2
        }
    }
}

const inputUpdate : Prisma.FinalExamRegistrationUpdateInput = {
    state: "Aprroved"
}

const mockFinalExamRegistrationWithRelations : FinalExamRegistrationWithRelations = {
    id: 1,
    state: "Aprroved",
    qualification: 10,
    student_id: 3,
    final_exam_id: 2,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    student: {
        id: 1,
        user_id: 1,
        career_id: 1,
        legajo: 10000,
        user: {
            id: 1,
            name: "Tomás",
            last_name: "Montes",
            email: "tomimo@gmail.com",
            password: "123456",
            gender: "F",
            cuil: 20727828372,
            phone: 2618009675,
            facultyId: 3,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    },

    exam: {
        id: 2,
        date: expect.any(Date),
        classroom_id: null,
        subject_info_id: 4,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
}


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