

import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { EducationalOfferService } from "../../src/services/educationalOffer.service"
import { EducationalOfferCreateInput, EducationalOfferUpdateInput } from "../../src/validators/educationalOffer.validator"
import * as educationalOffer from "../mocks/educationalOffer.mock"


jest.mock('../../src/services/educationalOffer.service', () => ({
    EducationalOfferService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(EducationalOfferService)

class EducationalOfferControllerTest extends BaseControllerTest <typeof mockedService, EducationalOfferService> {

    constructor(){
        super(mockedService, "/api/educationalOffer", EducationalOfferService, appTest)
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



const educationalOfferBadInput : object = {
    nombre: "Alumno",
    universidad: "UTN",
    legajo: 231,
    provincia: "Mendoza"
}


const educationalOfferCreateInput : EducationalOfferCreateInput = {
    year: 4,
    faculty_id: "2",
    career_id: "36",
    price: 105.67
}

const educationalOfferUpdateInput : EducationalOfferUpdateInput = {
    year: 4
}


const educationalOfferTest = new EducationalOfferControllerTest()

describe("EducationalOffer controller", () => {


    describe("GET / educationalOffer (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await educationalOfferTest.get(educationalOffer.mockEducationalOfferArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await educationalOfferTest.getFail()

        })

    })


    describe("GET /educationalOffer (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

           await educationalOfferTest.getById(educationalOffer.mockEducationalOfferWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await educationalOfferTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

           await educationalOfferTest.getByIdFail()

        })

    })


    describe("POST /educationalOffer", () => {

        test("Should response with a 201 status code and data", async () => {

            await educationalOfferTest.create(educationalOffer.mockEducationalOffer, educationalOfferCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await educationalOfferTest.createBadRequest(educationalOfferBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await educationalOfferTest.createFail(educationalOfferCreateInput)

        })

    })


    describe("PUT /educationalOffer", () => {

        test("Should response with a 200 status code and data", async () => {

            await educationalOfferTest.put(educationalOffer.mockEducationalOffer, educationalOfferUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await educationalOfferTest.putBadRequestInput(educationalOfferBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await educationalOfferTest.putNotFound(educationalOfferUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await educationalOfferTest.putFail(educationalOfferUpdateInput)

        })

    })


    describe("PATCH /educationalOffer", () => {

        test("Should response with a 200 status code and data", async () => {

            await educationalOfferTest.patch(educationalOffer.mockEducationalOffer, educationalOfferUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await educationalOfferTest.patchBadRequestInput(educationalOfferBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await educationalOfferTest.patchNotFound(educationalOfferUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await educationalOfferTest.patchFail(educationalOfferUpdateInput)

        })

    })


    describe("DELETE /educationalOffer", () => {

        test("Should response with a 200 status code and data", async () => {

            await educationalOfferTest.delete(educationalOffer.mockEducationalOffer)

        })


        test("Should response with a 404 status code and error", async () => {

            await educationalOfferTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await educationalOfferTest.deleteFail()

        })

    })

})