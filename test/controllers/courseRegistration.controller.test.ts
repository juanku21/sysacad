
import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { CourseRegistrationService } from "../../src/services/courseRegistration.service"
import { CourseRegistrationCreateInput, CourseRegistrationUpdateInput } from "../../src/validators/courseRegistration.validator"
import * as courseRegistration from "../mocks/courseRegistration.mock"


jest.mock('../../src/services/courseRegistration.service', () => ({
    CourseRegistrationService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(CourseRegistrationService)

class CourseRegistrationControllerTest extends BaseControllerTest <typeof mockedService, CourseRegistrationService> {

    constructor(){
        super(mockedService, "/api/courseRegistration", CourseRegistrationService, appTest)
    }

}


beforeAll(() => {
    appTest.start()
})

beforeEach(async () => {
    jest.clearAllMocks()
})
        

afterAll(async () => {
    appTest.stop()
})



const courseRegistrationBadInput : object = {
    nombre: 466,
    universidad: "UTN",
    nivel: 2,
}


const courseRegistrationCreateInput : CourseRegistrationCreateInput = {
    state: "Regular",
    student_id: "safasf",
    dictation_id: "khfok"

}

const courseRegistrationUpdateInput : CourseRegistrationUpdateInput = {
    state: "Regular",
    student_id: "safasf",
    dictation_id: "khfok"
}



const courseRegistrationTest = new CourseRegistrationControllerTest()

describe("CourseRegistration controller", () => {


    describe("GET /courseRegistration (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await courseRegistrationTest.get(courseRegistration.mockCourseRegistrationArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await courseRegistrationTest.getFail()

        })

    })


    describe("GET /courseRegistration (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

           await courseRegistrationTest.getById(courseRegistration.mockCourseRegistrationWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await courseRegistrationTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

           await courseRegistrationTest.getByIdFail()

        })

    })


    describe("POST /courseRegistration", () => {

        test("Should response with a 201 status code and data", async () => {

            await courseRegistrationTest.create(courseRegistration.mockCourseRegistration, courseRegistrationCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await courseRegistrationTest.createBadRequest(courseRegistrationBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await courseRegistrationTest.createFail(courseRegistrationCreateInput)

        })

    })


    describe("PUT /courseRegistration", () => {

        test("Should response with a 200 status code and data", async () => {

            await courseRegistrationTest.put(courseRegistration.mockCourseRegistration, courseRegistrationUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await courseRegistrationTest.putBadRequestInput(courseRegistrationBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await courseRegistrationTest.putNotFound(courseRegistrationUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await courseRegistrationTest.putFail(courseRegistrationUpdateInput)

        })

    })


    describe("PATCH /courseRegistration", () => {

        test("Should response with a 200 status code and data", async () => {

            await courseRegistrationTest.patch(courseRegistration.mockCourseRegistration, courseRegistrationUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await courseRegistrationTest.patchBadRequestInput(courseRegistrationBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await courseRegistrationTest.patchNotFound(courseRegistrationUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await courseRegistrationTest.patchFail(courseRegistrationUpdateInput)

        })

    })


    describe("DELETE /courseRegistration", () => {

        test("Should response with a 200 status code and data", async () => {

            await courseRegistrationTest.delete(courseRegistration.mockCourseRegistration)

        })


        test("Should response with a 404 status code and error", async () => {

            await courseRegistrationTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await courseRegistrationTest.deleteFail()

        })

    })

})




