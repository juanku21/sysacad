

import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { FinalExamService } from "../../src/services/finalExam.service"
import { FinalExamCreateInput, FinalExamUpdateInput } from "../../src/validators/finalExam.validator"
import * as finalExam from "../mocks/finalExam.mock"


jest.mock('../../src/services/finalExam.service', () => ({
    FinalExamService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(FinalExamService)

class FinalExamControllerTest extends BaseControllerTest <typeof mockedService, FinalExamService> {

    constructor(){
        super(mockedService, "/api/finalExam", FinalExamService, appTest)
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



const finalExamBadInput : object = {
    nombre: "Alumno",
    universidad: "UTN",
    legajo: 231,
    provincia: "Mendoza"
}


const finalExamCreateInput : FinalExamCreateInput = {
    date: new Date(),
    subject_info_id: "Anual" ,
    classroom_id: "Aula 1"
}

const finalExamUpdateInput : FinalExamUpdateInput = {
    date: new Date(),
    subject_info_id: "Anual",
    classroom_id: "Aula 1"
}


const finalExamTest = new FinalExamControllerTest()

describe("FinalExam controller", () => {


    describe("GET /finalExam (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await finalExamTest.get(finalExam.mockFinalExamArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await finalExamTest.getFail()

        })

    })


    describe("GET /finalExam (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

           await finalExamTest.getById(finalExam.mockFinalExamWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await finalExamTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

           await finalExamTest.getByIdFail()

        })

    })


    describe("POST /finalExam", () => {

        test("Should response with a 201 status code and data", async () => {

            await finalExamTest.create(finalExam.mockFinalExam, finalExamCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await finalExamTest.createBadRequest(finalExamBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await finalExamTest.createFail(finalExamCreateInput)

        })

    })


    describe("PUT /finalExam", () => {

        test("Should response with a 200 status code and data", async () => {

            await finalExamTest.put(finalExam.mockFinalExam, finalExamUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await finalExamTest.putBadRequestInput(finalExamBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await finalExamTest.putNotFound(finalExamUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await finalExamTest.putFail(finalExamUpdateInput)

        })

    })


    describe("PATCH /finalExam", () => {

        test("Should response with a 200 status code and data", async () => {

            await finalExamTest.patch(finalExam.mockFinalExam, finalExamUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await finalExamTest.patchBadRequestInput(finalExamBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await finalExamTest.patchNotFound(finalExamUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await finalExamTest.patchFail(finalExamUpdateInput)

        })

    })


    describe("DELETE /finalExam", () => {

        test("Should response with a 200 status code and data", async () => {

            await finalExamTest.delete(finalExam.mockFinalExam)

        })


        test("Should response with a 404 status code and error", async () => {

            await finalExamTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await finalExamTest.deleteFail()

        })

    })

})