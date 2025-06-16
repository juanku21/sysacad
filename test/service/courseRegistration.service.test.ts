
import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { CourseRegistration } from "@prisma/client"
import { CourseRegistrationService } from "../../src/services/courseRegistration.service"
import { CourseRegistrationWithRelations } from "../../src/types" 
import { 
    mockCourseRegistration, 
    mockCourseRegistrationWithRelations, 
    mockCourseRegistrationArray,
    inputCreate,
    inputUpdate
 } from "../mocks/courseRegistration.mock"

 

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