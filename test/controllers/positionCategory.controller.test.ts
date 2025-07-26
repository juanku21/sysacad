

import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { PositionCategoryService } from "../../src/services/positionCategory.service"
import { PositionCategoryCreateInput, PositionCategoryUpdateInput } from "../../src/validators/positionCategory.validator"
import * as positionCategory from "../mocks/positionCategory.mock"


jest.mock('../../src/services/positionCategory.service', () => ({
    PositionCategoryService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(PositionCategoryService)

class PositionCategoryControllerTest extends BaseControllerTest <typeof mockedService, PositionCategoryService> {

    constructor(){
        super(mockedService, "/api/positionCategory", PositionCategoryService, appTest)
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



const positionCategoryBadInput : object = {
    nombre: "Alumno",
    universidad: "UTN",
    legajo: 231,
    provincia: "Mendoza"
}


const positionCategoryCreateInput : PositionCategoryCreateInput = {
    name: "Teacher",
    description: "Profesor"
}

const positionCategoryUpdateInput : PositionCategoryUpdateInput = {
    name: "Teacher",
    description: "Profesor"
}


const positionCategoryTest = new PositionCategoryControllerTest()

describe("PositionCategory controller", () => {


    describe("GET /positionCategory (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await positionCategoryTest.get(positionCategory.mockPositionCategoryArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await positionCategoryTest.getFail()

        })

    })


    describe("GET /positionCategory (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

        await positionCategoryTest.getById(positionCategory.mockPositionCategoryWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await positionCategoryTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

        await positionCategoryTest.getByIdFail()

        })

    })


    describe("POST /positionCategory", () => {

        test("Should response with a 201 status code and data", async () => {

            await positionCategoryTest.create(positionCategory.mockPositionCategory, positionCategoryCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await positionCategoryTest.createBadRequest(positionCategoryBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await positionCategoryTest.createFail(positionCategoryCreateInput)

        })

    })


    describe("PUT /positionCategory", () => {

        test("Should response with a 200 status code and data", async () => {

            await positionCategoryTest.put(positionCategory.mockPositionCategory, positionCategoryUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await positionCategoryTest.putBadRequestInput(positionCategoryBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await positionCategoryTest.putNotFound(positionCategoryUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await positionCategoryTest.putFail(positionCategoryUpdateInput)

        })

    })


    describe("PATCH /positionCategory", () => {

        test("Should response with a 200 status code and data", async () => {

            await positionCategoryTest.patch(positionCategory.mockPositionCategory, positionCategoryUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await positionCategoryTest.patchBadRequestInput(positionCategoryBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await positionCategoryTest.patchNotFound(positionCategoryUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await positionCategoryTest.patchFail(positionCategoryUpdateInput)

        })

    })


    describe("DELETE /positionCategory", () => {

        test("Should response with a 200 status code and data", async () => {

            await positionCategoryTest.delete(positionCategory.mockPositionCategory)

        })


        test("Should response with a 404 status code and error", async () => {

            await positionCategoryTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await positionCategoryTest.deleteFail()

        })

    })

})