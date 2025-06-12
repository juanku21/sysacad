
import { BaseServiceTest } from "./utils/base-test"
import { prismaMock } from "../src/config/singleton"
import { Prisma } from "@prisma/client"
import { CourseRegistration } from "@prisma/client"
import { CourseRegistrationService } from "../src/services/couserRegistration.service"
import { CourseRegistrationWithRelations } from "../src/types" 


class CourseRegistrationServiceTest extends BaseServiceTest 
<typeof prismaMock.courseRegistration, CourseRegistration, CourseRegistrationService, Prisma.CourseRegistrationCreateInput, Prisma.CourseRegistrationUpdateInput> {

    constructor(){
        super(prismaMock.courseRegistration, CourseRegistrationService)
    }

    public async findById(mockCourseRegistration : CourseRegistrationWithRelations){

        this.mock.findUnique.mockResolvedValue(mockCourseRegistration)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockCourseRegistration)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const courseRegistrationTest = new CourseRegistrationServiceTest()


// mocks and input data

const mockCourseRegistrationArray : CourseRegistration[] = [
    {
        id: 1,
        state: "Attending",
        studentId: 1,
        dicatationId: 4,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockCourseRegistration : CourseRegistration = {
    id: 1,
    state: "Attending",
    studentId: 1,
    dicatationId: 4,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.CourseRegistrationCreateInput = {
    state: "Attending",

    dictation: {
        connect: {
            id: 4
        }
    },

    student: {
        connect: {
            id: 1
        }
    }
}

const inputUpdate : Prisma.CourseRegistrationUpdateInput = {
    state: "Regular"
}

const mockCourseRegistrationWithRelations : CourseRegistrationWithRelations = {
    id: 1,
    state: "Attending",
    studentId: 1,
    dicatationId: 2,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    student: {
        id: 1,
        userId: 1,
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

    dictation: {
        id: 2,
        year: 2024,
        subject_id: 4,
        classroom_id: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
}


// tests


describe("Course Registration service test", () => {

    test("should return a list with all course registrations", async () => {

        await courseRegistrationTest.get(mockCourseRegistrationArray)

    })

    test("should return one course registration with all relations", async () => {

        await courseRegistrationTest.findById(mockCourseRegistrationWithRelations)

    })

    test("should create a new course registration", async () => {

        await courseRegistrationTest.create(mockCourseRegistration, inputCreate)

    })

    test("should update course registration data", async () => {

        await courseRegistrationTest.update(mockCourseRegistration, inputUpdate)

    })


    test("should delete a course registration", async () => {

        await courseRegistrationTest.delete(mockCourseRegistration)

    })


})