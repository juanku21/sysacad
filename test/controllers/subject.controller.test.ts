
import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { SubjectService } from "../../src/services/subject.service"
import { SubjectCreateInput, SubjectUpdateInput } from "../../src/validators/subject.validator"
import * as subject from "../mocks/subject.mock"


jest.mock('../../src/services/subject.service', () => ({
    SubjectService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(SubjectService)

class SubjectControllerTest extends BaseControllerTest <typeof mockedService, SubjectService> {

    constructor(){
        super(mockedService, "/api/subject", SubjectService, appTest)
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



const subjectBadInput : object = {
    nombre: 123,
    universidad: "UTN",
    nivel: 2,
}


const subjectCreateInput : SubjectCreateInput = {
    name: "Ingles",
    code: 9765,
    description: "Una materia genial"
}

const subjectUpdateInput : SubjectUpdateInput = {
    name: "Ingles",
    code: 9812,
    description: "Una carrera genial"
}



const subjectTest = new SubjectControllerTest()

describe("Subject controller", () => {


    describe("GET /subject (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await subjectTest.get(subject.mockSubjectArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await subjectTest.getFail()

        })

    })


    describe("GET /subject (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

           await subjectTest.getById(subject.mockSubjectWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await subjectTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

           await subjectTest.getByIdFail()

        })

    })


    describe("POST /subject", () => {

        test("Should response with a 201 status code and data", async () => {

            await subjectTest.create(subject.mockSubject, subjectCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await subjectTest.createBadRequest(subjectBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await subjectTest.createFail(subjectCreateInput)

        })

    })


    describe("PUT /subject", () => {

        test("Should response with a 200 status code and data", async () => {

            await subjectTest.put(subject.mockSubject, subjectUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await subjectTest.putBadRequestInput(subjectBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await subjectTest.putNotFound(subjectUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await subjectTest.putFail(subjectUpdateInput)

        })

    })


    describe("PATCH /subject", () => {

        test("Should response with a 200 status code and data", async () => {

            await subjectTest.patch(subject.mockSubject, subjectUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await subjectTest.patchBadRequestInput(subjectBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await subjectTest.patchNotFound(subjectUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await subjectTest.patchFail(subjectUpdateInput)

        })

    })


    describe("DELETE /subject", () => {

        test("Should response with a 200 status code and data", async () => {

            await subjectTest.delete(subject.mockSubject)

        })


        test("Should response with a 404 status code and error", async () => {

            await subjectTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await subjectTest.deleteFail()

        })

    })

})




