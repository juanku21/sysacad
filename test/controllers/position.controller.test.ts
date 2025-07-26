
import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { PositionService } from "../../src/services/position.service"
import { PositionCreateInput, PositionUpdateInput } from "../../src/validators/position.validator"
import * as position from "../mocks/position.mock"


jest.mock('../../src/services/position.service', () => ({
    PositionService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(PositionService)

class PositionControllerTest extends BaseControllerTest <typeof mockedService, PositionService> {

    constructor(){
        super(mockedService, "/api/position", PositionService, appTest)
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



const positionBadInput : object = {
    nombre: 466,
    universidad: "UTN",
    nivel: 2,
    grado: 5,
    materia: "Ingles"
}


const positionCreateInput : PositionCreateInput = {
    name: "Profesor de ingles",
    description: "Una posicion divertida ",
    puntaje: 134.5,
    area: "Idiomas",
    category_id: "sadfasf"
}

const positionUpdateInput : PositionUpdateInput = {
    name: "Profesor de ingles",
    description: "Una posicion divertida ",
    puntaje: 134.5,
    area: "Idiomas",
    category_id: "sadfasf"
}



const positionTest = new PositionControllerTest()

describe("Position controller", () => {


    describe("GET /position (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await positionTest.get(position.mockPositionArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await positionTest.getFail()

        })

    })


    describe("GET /position (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

           await positionTest.getById(position.mockPositionWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await positionTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

           await positionTest.getByIdFail()

        })

    })


    describe("POST /position", () => {

        test("Should response with a 201 status code and data", async () => {

            await positionTest.create(position.mockPosition, positionCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await positionTest.createBadRequest(positionBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await positionTest.createFail(positionCreateInput)

        })

    })


    describe("PUT /position", () => {

        test("Should response with a 200 status code and data", async () => {

            await positionTest.put(position.mockPosition, positionUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await positionTest.putBadRequestInput(positionBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await positionTest.putNotFound(positionUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await positionTest.putFail(positionUpdateInput)

        })

    })


    describe("PATCH /position", () => {

        test("Should response with a 200 status code and data", async () => {

            await positionTest.patch(position.mockPosition, positionUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await positionTest.patchBadRequestInput(positionBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await positionTest.patchNotFound(positionUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await positionTest.patchFail(positionUpdateInput)

        })

    })


    describe("DELETE /position", () => {

        test("Should response with a 200 status code and data", async () => {

            await positionTest.delete(position.mockPosition)

        })


        test("Should response with a 404 status code and error", async () => {

            await positionTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await positionTest.deleteFail()

        })

    })

})




