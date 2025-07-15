
import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { CareerService } from "../../src/services/career.service"
import { CareerCreateInput, CareerUpdateInput } from "../../src/validators/career.validator"
import * as career from "../mocks/career.mock"


jest.mock('../../src/services/career.service', () => ({
    CareerService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(CareerService)

class CareerControllerTest extends BaseControllerTest <typeof mockedService, CareerService> {

    constructor(){
        super(mockedService, "/api/career", CareerService, appTest)
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



const careerBadInput : object = {
    nombre: "Ingeniería Civil",
    universidad: "UTN",
    nivel: 2,
    provincia: "Mendoza"
}


const careerCreateInput : CareerCreateInput = {
    name: "Ingiería en Sistemas",
    code: 9812,
    description: "Una carrera genial",
    level: "Degree"
}

const careerUpdateInput : CareerUpdateInput = {
    code: 9812,
    description: "Una carrera genial",
    level: "Degree"
}



const careerTest = new CareerControllerTest()

describe("Career controller", () => {


    describe("GET /career (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await careerTest.get(career.mockCareerArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await careerTest.getFail()

        })

    })


    describe("GET /career (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

           await careerTest.getById(career.mockCareerWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await careerTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

           await careerTest.getByIdFail()

        })

    })


    describe("POST /career", () => {

        test("Should response with a 201 status code and data", async () => {

            await careerTest.create(career.mockCareer, careerCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await careerTest.createBadRequest(careerBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await careerTest.createFail(careerCreateInput)

        })

    })


    describe("PUT /career", () => {

        test("Should response with a 200 status code and data", async () => {

            await careerTest.put(career.mockCareer, careerUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await careerTest.putBadRequestInput(careerBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await careerTest.putNotFound(careerUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await careerTest.putFail(careerUpdateInput)

        })

    })


    describe("PATCH /career", () => {

        test("Should response with a 200 status code and data", async () => {

            await careerTest.patch(career.mockCareer, careerUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await careerTest.patchBadRequestInput(careerBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await careerTest.patchNotFound(careerUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await careerTest.patchFail(careerUpdateInput)

        })

    })


    describe("DELETE /career", () => {

        test("Should response with a 200 status code and data", async () => {

            await careerTest.delete(career.mockCareer)

        })


        test("Should response with a 404 status code and error", async () => {

            await careerTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await careerTest.deleteFail()

        })

    })

})




