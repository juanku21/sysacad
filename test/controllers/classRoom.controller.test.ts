

import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { ClassRoomService } from "../../src/services/classRoom.service"
import { ClassRoomCreateInput, ClassRoomUpdateInput } from "../../src/validators/classRoom.validator"
import * as classRoom from "../mocks/classRoom.mock"


jest.mock('../../src/services/classRoom.service', () => ({
    ClassRoomService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(ClassRoomService)

class ClassRoomControllerTest extends BaseControllerTest <typeof mockedService, ClassRoomService> {

    constructor(){
        super(mockedService, "/api/classRoom", ClassRoomService, appTest)
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



const classRoomBadInput : object = {
    nombre: "Alumno",
    universidad: "UTN",
    legajo: 231,
    provincia: "Mendoza"
}


const classRoomCreateInput : ClassRoomCreateInput = {
    name: "Aula 1",
    code: 1234,
    capacity: 100,
    projector: true,
    board: true,
    air_conditioning: true,
    heating: true,
    wifi: true,
    faculty_id: "123a",
}

const classRoomUpdateInput : ClassRoomUpdateInput = {
    name: "Aula 1",
    code: 1234,
    capacity: 100,
    projector: true,
    board: true,
    air_conditioning: true,
    heating: true,
    wifi: true,
    faculty_id: "123a",
}


const classRoomTest = new ClassRoomControllerTest()

describe("ClassRoom controller", () => {


    describe("GET /classRoom (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await classRoomTest.get(classRoom.mockClassRoomArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await classRoomTest.getFail()

        })

    })


    describe("GET /classRoom (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

            await classRoomTest.getById(classRoom.mockClassRoomWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await classRoomTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await classRoomTest.getByIdFail()

        })

    })


    describe("POST /classRoom", () => {

        test("Should response with a 201 status code and data", async () => {

            await classRoomTest.create(classRoom.mockClassRoom, classRoomCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await classRoomTest.createBadRequest(classRoomBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await classRoomTest.createFail(classRoomCreateInput)

        })

    })


    describe("PUT /classRoom", () => {

        test("Should response with a 200 status code and data", async () => {

            await classRoomTest.put(classRoom.mockClassRoom, classRoomUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await classRoomTest.putBadRequestInput(classRoomBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await classRoomTest.putNotFound(classRoomUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await classRoomTest.putFail(classRoomUpdateInput)

        })

    })


    describe("PATCH /classRoom", () => {

        test("Should response with a 200 status code and data", async () => {

            await classRoomTest.patch(classRoom.mockClassRoom, classRoomUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await classRoomTest.patchBadRequestInput(classRoomBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await classRoomTest.patchNotFound(classRoomUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await classRoomTest.patchFail(classRoomUpdateInput)

        })

    })


    describe("DELETE /classRoom", () => {

        test("Should response with a 200 status code and data", async () => {

            await classRoomTest.delete(classRoom.mockClassRoom)

        })


        test("Should response with a 404 status code and error", async () => {

            await classRoomTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await classRoomTest.deleteFail()

        })

    })

})