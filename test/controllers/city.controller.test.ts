


import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { CityService } from "../../src/services/city.service"
import * as city from "../mocks/city.mock"


jest.mock('../../src/services/city.service', () => ({
    CityService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(CityService)

class CityControllerTest extends BaseControllerTest <typeof mockedService, CityService> {

    constructor(){
        super(mockedService, "/api/city", CityService, appTest)
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



const cityBadInput : object = {
    nombre: "San Rafael",
    provincia: "Mendoza"
}



const cityTest = new CityControllerTest()

describe("City controller", () => {


    describe("GET /city (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await cityTest.get(city.mockCityArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await cityTest.getFail()

        })

    })


    describe("GET /city (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

           await cityTest.getById(city.mockCityWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await cityTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

           await cityTest.getByIdFail()

        })

    })


    describe("POST /city", () => {

        test("Should response with a 201 status code and data", async () => {

            await cityTest.create(city.mockCity, city.inputCreate)

        })

        test("Should response with a 400 status code and message", async () => {

            await cityTest.createBadRequest(cityBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await cityTest.createFail(city.inputCreate)

        })

    })


    describe("PUT /city", () => {

        test("Should response with a 200 status code and data", async () => {

            await cityTest.put(city.mockCity, city.inputUpdate)

        })


        test("Should response with a 400 status code and message", async () => {

            await cityTest.putBadRequestInput(cityBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await cityTest.putNotFound(city.inputUpdate)

        })

        test("Should response with a 503 status code and error", async () => {

            await cityTest.putFail(city.inputUpdate)

        })

    })


    describe("PATCH /city", () => {

        test("Should response with a 200 status code and data", async () => {

            await cityTest.patch(city.mockCity, city.inputUpdate)

        })


        test("Should response with a 400 status code and message", async () => {

            await cityTest.patchBadRequestInput(cityBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await cityTest.patchNotFound(city.inputUpdate)

        })

        test("Should response with a 503 status code and error", async () => {

            await cityTest.patchFail(city.inputUpdate)

        })

    })


    describe("DELETE /city", () => {

        test("Should response with a 200 status code and data", async () => {

            await cityTest.delete(city.mockCity)

        })


        test("Should response with a 404 status code and error", async () => {

            await cityTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await cityTest.deleteFail()

        })

    })

})




