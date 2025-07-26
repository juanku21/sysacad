
import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { CorrelativityService } from "../../src/services/correlativity.service"
import { CorrelativityCreateInput, CorrelativityUpdateInput, CorrelativityValidator } from "../../src/validators/correlativity.validator"
import * as correlativity from "../mocks/correlativity.mock"


jest.mock('../../src/services/correlativity.service', () => ({
    CorrelativityService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(CorrelativityService)

class CorrelativityControllerTest extends BaseControllerTest <typeof mockedService, CorrelativityService> {

    constructor(){
        super(mockedService, "/api/correlativity", CorrelativityService, appTest)
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



const correlativityBadInput : object = {
    nombre: "Alumno"
}

const correlativityCreateInput : CorrelativityCreateInput = {

    course: true,
    aprrove: true,
    type: "Attend",
    subject_id: "9542",
    correlativitie_id: "8456",
    study_plan_id: "5874"
}


const correlativityUpdateInput : CorrelativityUpdateInput = {
    course: true
}


const correlativityTest = new CorrelativityControllerTest()

describe("Correlativity controller", () => {


    describe("GET /correlativity (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await correlativityTest.get(correlativity.mockCorrelativityArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await correlativityTest.getFail()

        })

    })


    describe("GET /correlativity (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

        await correlativityTest.getById(correlativity.mockCorrelativityWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await correlativityTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

        await correlativityTest.getByIdFail()

        })

    })


    describe("POST /correlativity", () => {

        test("Should response with a 201 status code and data", async () => {

            await correlativityTest.create(correlativity.mockCorrelativity, correlativityCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await correlativityTest.createBadRequest(correlativityBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await correlativityTest.createFail(correlativityCreateInput)

        })

    })


    describe("PUT /correlativity", () => {

        test("Should response with a 200 status code and data", async () => {

            await correlativityTest.put(correlativity.mockCorrelativity, correlativityUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await correlativityTest.putBadRequestInput(correlativityBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await correlativityTest.putNotFound(correlativityUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await correlativityTest.putFail(correlativityUpdateInput)

        })

    })


    describe("PATCH /correlativity", () => {

        test("Should response with a 200 status code and data", async () => {

            await correlativityTest.patch(correlativity.mockCorrelativity, correlativityUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await correlativityTest.patchBadRequestInput(correlativityBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await correlativityTest.patchNotFound(correlativityUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await correlativityTest.patchFail(correlativityUpdateInput)

        })

    })


    describe("DELETE /correlativity", () => {

        test("Should response with a 200 status code and data", async () => {

            await correlativityTest.delete(correlativity.mockCorrelativity)

        })


        test("Should response with a 404 status code and error", async () => {

            await correlativityTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await correlativityTest.deleteFail()

        })

    })

})
