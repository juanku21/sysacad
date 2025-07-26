
import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { QualificationService } from "../../src/services/qualification.service"
import { QualificationCreateInput, QualificationUpdateInput } from "../../src/validators/qualification.validator"
import * as qualification from "../mocks/qualification.mock"


jest.mock('../../src/services/qualification.service', () => ({
    QualificationService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(QualificationService)

class QualificationControllerTest extends BaseControllerTest <typeof mockedService, QualificationService> {

    constructor(){
        super(mockedService, "/api/qualification", QualificationService, appTest)
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



const qualificationBadInput : object = {
    nombre: "Alumno"
}

const qualificationCreateInput : QualificationCreateInput = {

    value: 10,
    student_id: "70",
    subject_id: "50"
}


const qualificationUpdateInput : QualificationUpdateInput = {
    value: 10
}


const qualificationTest = new QualificationControllerTest()

describe("Qualification controller", () => {


    describe("GET /qualification (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await qualificationTest.get(qualification.mockQualificationArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await qualificationTest.getFail()

        })

    })


    describe("GET /qualification (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

        await qualificationTest.getById(qualification.mockQualification)

        })


        test("Should response with a 404 status code and error", async () => {

            await qualificationTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

        await qualificationTest.getByIdFail()

        })

    })


    describe("POST /qualification", () => {

        test("Should response with a 201 status code and data", async () => {

            await qualificationTest.create(qualification.mockQualification, qualificationCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await qualificationTest.createBadRequest(qualificationBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await qualificationTest.createFail(qualificationCreateInput)

        })

    })


    describe("PUT /qualification", () => {

        test("Should response with a 200 status code and data", async () => {

            await qualificationTest.put(qualification.mockQualification, qualificationUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await qualificationTest.putBadRequestInput(qualificationBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await qualificationTest.putNotFound(qualificationUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await qualificationTest.putFail(qualificationUpdateInput)

        })

    })


    describe("PATCH /qualification", () => {

        test("Should response with a 200 status code and data", async () => {

            await qualificationTest.patch(qualification.mockQualification, qualificationUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await qualificationTest.patchBadRequestInput(qualificationBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await qualificationTest.patchNotFound(qualificationUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await qualificationTest.patchFail(qualificationUpdateInput)

        })

    })


    describe("DELETE /qualification", () => {

        test("Should response with a 200 status code and data", async () => {

            await qualificationTest.delete(qualification.mockQualification)

        })


        test("Should response with a 404 status code and error", async () => {

            await qualificationTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await qualificationTest.deleteFail()

        })

    })

})