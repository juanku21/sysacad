
import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { UniversityService } from "../../src/services/university.service"
import { Auth } from "../../src/middlewares/auth"
import * as university from "../mocks/university.mock"


jest.mock('../../src/services/university.service', () => ({
    UniversityService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

jest.mock('../../src/middlewares/auth.ts', () => ({
    Auth: {
        verifyToken: jest.fn((req, res, next) => next()),
        verifyRole: jest.fn(() => (req, res, next) => next())
    }
}))


const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(UniversityService)


class UniversityControllerTest extends BaseControllerTest <typeof mockedService, UniversityService> {

    constructor(){
        super(mockedService, "/api/university", UniversityService, appTest)
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



const universityBadInput : object = {
    nombre: "Universidad de Mendoza",
    provincia: "Mendoza"
}



const universityTest = new UniversityControllerTest()

describe("University controller", () => {


    describe("GET /university (all)", () => {

        test("Should response with a 200 status code and data", async () => {

            await universityTest.get(university.mockUniversityArray)

        })

        test("Should response with a 503 status code and error", async () => {

            await universityTest.getFail()

        })

    })


    describe("GET /university (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

           await universityTest.getById(university.mockUniversityWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await universityTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

           await universityTest.getByIdFail()

        })

    })


    describe("POST /university", () => {

        test("Should response with a 201 status code and data", async () => {

            await universityTest.create(university.mockUniversity, university.inputCreate)

        })

        test("Should response with a 400 status code and message", async () => {

            await universityTest.createBadRequest(universityBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await universityTest.createFail(university.inputCreate)

        })

    })


    describe("PUT /university", () => {

        test("Should response with a 200 status code and data", async () => {

            await universityTest.put(university.mockUniversity, university.inputUpdate)

        })


        test("Should response with a 400 status code and message", async () => {

            await universityTest.putBadRequestInput(universityBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await universityTest.putNotFound(university.inputUpdate)

        })

        test("Should response with a 503 status code and error", async () => {

            await universityTest.putFail(university.inputUpdate)

        })

    })


    describe("PATCH /university", () => {

        test("Should response with a 200 status code and data", async () => {

            await universityTest.patch(university.mockUniversity, university.inputUpdate)

        })


        test("Should response with a 400 status code and message", async () => {

            await universityTest.patchBadRequestInput(universityBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await universityTest.patchNotFound(university.inputUpdate)

        })

        test("Should response with a 503 status code and error", async () => {

            await universityTest.patchFail(university.inputUpdate)

        })

    })


    describe("DELETE /university", () => {

        test("Should response with a 200 status code and data", async () => {

            await universityTest.delete(university.mockUniversity)

        })


        test("Should response with a 404 status code and error", async () => {

            await universityTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await universityTest.deleteFail()

        })

    })

})




