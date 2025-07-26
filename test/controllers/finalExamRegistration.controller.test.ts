

import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { FinalExamRegistrationService } from "../../src/services/finalExamRegistration.service"
import { FinalExamRegistrationCreateInput, FinalExamRegistrationUpdateInput } from "../../src/validators/finalExamRegistration.validator"
import * as finalExamRegistration from "../mocks/finalExamRegistration.mock"


jest.mock('../../src/services/finalExamRegistration.service', () => ({
    FinalExamRegistrationService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(FinalExamRegistrationService)

class FinalExamRegistrationControllerTest extends BaseControllerTest <typeof mockedService, FinalExamRegistrationService> {

    constructor(){
        super(mockedService, "/api/finalExamRegistration", FinalExamRegistrationService, appTest)
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



const finalExamRegistrationBadInput : object = {
    nombre: "Alumno",
    universidad: "UTN",
    legajo: 231,
    provincia: "Mendoza"
}


const finalExamRegistrationCreateInput : FinalExamRegistrationCreateInput = {
    qualification: 8,
    state: "Disapproved",
    student_id: "3656",
    final_exam_id: "324"
}

const finalExamRegistrationUpdateInput : FinalExamRegistrationUpdateInput = {
    qualification: 8,
}


const finalExamRegistrationTest = new FinalExamRegistrationControllerTest()

describe("FinalExamRegistration controller", () => {


    describe("GET /finalExamRegistration (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await finalExamRegistrationTest.get(finalExamRegistration.mockFinalExamRegistrationArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await finalExamRegistrationTest.getFail()

        })

    })


    describe("GET /finalExamRegistration (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

           await finalExamRegistrationTest.getById(finalExamRegistration.mockFinalExamRegistrationWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await finalExamRegistrationTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

           await finalExamRegistrationTest.getByIdFail()

        })

    })


    describe("POST /finalExamRegistration", () => {

        test("Should response with a 201 status code and data", async () => {

            await finalExamRegistrationTest.create(finalExamRegistration.mockFinalExamRegistration, finalExamRegistrationCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await finalExamRegistrationTest.createBadRequest(finalExamRegistrationBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await finalExamRegistrationTest.createFail(finalExamRegistrationCreateInput)

        })

    })


    describe("PUT /finalExamRegistration", () => {

        test("Should response with a 200 status code and data", async () => {

            await finalExamRegistrationTest.put(finalExamRegistration.mockFinalExamRegistration, finalExamRegistrationUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await finalExamRegistrationTest.putBadRequestInput(finalExamRegistrationBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await finalExamRegistrationTest.putNotFound(finalExamRegistrationUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await finalExamRegistrationTest.putFail(finalExamRegistrationUpdateInput)

        })

    })


    describe("PATCH /finalExamRegistration", () => {

        test("Should response with a 200 status code and data", async () => {

            await finalExamRegistrationTest.patch(finalExamRegistration.mockFinalExamRegistration, finalExamRegistrationUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await finalExamRegistrationTest.patchBadRequestInput(finalExamRegistrationBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await finalExamRegistrationTest.patchNotFound(finalExamRegistrationUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await finalExamRegistrationTest.patchFail(finalExamRegistrationUpdateInput)

        })

    })


    describe("DELETE /finalExamRegistration", () => {

        test("Should response with a 200 status code and data", async () => {

            await finalExamRegistrationTest.delete(finalExamRegistration.mockFinalExamRegistration)

        })


        test("Should response with a 404 status code and error", async () => {

            await finalExamRegistrationTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await finalExamRegistrationTest.deleteFail()

        })

    })

})