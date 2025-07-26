
import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { SubjectDictationService } from "../../src/services/subjectDictation.service"
import { SubjectDictatiocCreateInput, SubjectDictationUpdateInput } from "../../src/validators/subjectDictation.validator"
import * as subjectDictation from "../mocks/subjectDictation.mock"


jest.mock('../../src/services/subjectDictation.service', () => ({
    SubjectDictationService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(SubjectDictationService)

class SubjectDictationControllerTest extends BaseControllerTest <typeof mockedService, SubjectDictationService> {

    constructor(){
        super(mockedService, "/api/subjectDictation", SubjectDictationService, appTest)
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



const subjectDictactionBadInput : object = {
    nombre: "Alumno"
}

const subjectDictationCreateInput : SubjectDictatiocCreateInput = {
    year: 5,
    subject_info_id: "10",
    classroom_id: "8",
}


const subjectDictationUpdateInput : SubjectDictationUpdateInput = {
    year: 5
}


const subjectDictationTest = new SubjectDictationControllerTest()

describe("Subject Dictation controller", () => {


    describe("GET /subject Dictation (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await subjectDictationTest.get(subjectDictation.mockSubjectDictationArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await subjectDictationTest.getFail()

        })

    })


    describe("GET /qualification (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

        await subjectDictationTest.getById(subjectDictation.mockSubjectDictation)

        })


        test("Should response with a 404 status code and error", async () => {

            await subjectDictationTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

        await subjectDictationTest.getByIdFail()

        })

    })


    describe("POST /subject Dictation", () => {

        test("Should response with a 201 status code and data", async () => {

            await subjectDictationTest.create(subjectDictation.mockSubjectDictation, subjectDictationCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await subjectDictationTest.createBadRequest(subjectDictactionBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await subjectDictationTest.createFail(subjectDictationCreateInput)

        })

    })


    describe("PUT /subject Dictation", () => {

        test("Should response with a 200 status code and data", async () => {

            await subjectDictationTest.put(subjectDictation.mockSubjectDictation, subjectDictationUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await subjectDictationTest.putBadRequestInput(subjectDictactionBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await subjectDictationTest.putNotFound(subjectDictationUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await subjectDictationTest.putFail(subjectDictationUpdateInput)

        })

    })


    describe("PATCH /subject Dictation", () => {

        test("Should response with a 200 status code and data", async () => {

            await subjectDictationTest.patch(subjectDictation.mockSubjectDictation, subjectDictationUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await subjectDictationTest.patchBadRequestInput(subjectDictactionBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await subjectDictationTest.patchNotFound(subjectDictationUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await subjectDictationTest.patchFail(subjectDictationUpdateInput)

        })

    })


    describe("DELETE / subject Dictation", () => {

        test("Should response with a 200 status code and data", async () => {

            await subjectDictationTest.delete(subjectDictation.mockSubjectDictation)

        })


        test("Should response with a 404 status code and error", async () => {

            await subjectDictationTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await subjectDictationTest.deleteFail()

        })

    })

})