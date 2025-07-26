
import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { SubjectInfoService } from "../../src/services/subjectInfo.service"
import { SubjectInfoCreateInput, SubjectInfoUpdateInput } from "../../src/validators/subjectInfo.validator"
import * as subjectInfo from "../mocks/subjectInfo.mock"

jest.mock('../../src/services/subjectInfo.service', () => ({
    SubjectInfoService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(SubjectInfoService)

class SubjectInfoControllerTest extends BaseControllerTest <typeof mockedService, SubjectInfoService> {

    constructor(){
        super(mockedService, "/api/subjectInfo", SubjectInfoService, appTest)
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



const subjectInfoBadInput : object = {
    nombre: "Ingeniería Civil",
    universidad: "UTN",
    nivel: 2,
    provincia: "Mendoza"
}


const subjectinfoCreateInput : SubjectInfoCreateInput = {
    hours: 5,
    type:"Yearly",
    subject_id: "whhw281u1s",
    study_plan_id: "zwhhw281u1s"
}

const subjectinfoUpdateInput : SubjectInfoUpdateInput = {
    hours: 5,
    type:"Yearly",
    subject_id: "whhw281u1s",
}


const subjectinfoTest = new SubjectInfoControllerTest()

describe("SubjectInfo controller", () => {


    describe("GET /SubjectInfo (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await subjectinfoTest.get(subjectInfo.mockSubjectInfoArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await subjectinfoTest.getFail()

        })

    })


    describe("GET /career (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

            await subjectinfoTest.getById(subjectInfo.mockSubjectInfoWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await subjectinfoTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await subjectinfoTest.getByIdFail()

        })

    })


    describe("POST /career", () => {

        test("Should response with a 201 status code and data", async () => {

            await subjectinfoTest.create(subjectInfo.mockSubjectInfo, subjectinfoCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await subjectinfoTest.createBadRequest(subjectInfoBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await subjectinfoTest.createFail(subjectinfoCreateInput)

        })

    })


    describe("PUT /career", () => {

        test("Should response with a 200 status code and data", async () => {

            await subjectinfoTest.put(subjectInfo.mockSubjectInfo, subjectinfoUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await subjectinfoTest.putBadRequestInput(subjectInfoBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await subjectinfoTest.putNotFound(subjectinfoUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await subjectinfoTest.putFail(subjectinfoUpdateInput)

        })

    })


    describe("PATCH /career", () => {

        test("Should response with a 200 status code and data", async () => {

            await subjectinfoTest.patch(subjectInfo.mockSubjectInfo, subjectinfoUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await subjectinfoTest.patchBadRequestInput(subjectInfoBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await subjectinfoTest.patchNotFound(subjectinfoUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await subjectinfoTest.patchFail(subjectinfoUpdateInput)

        })

    })


    describe("DELETE /career", () => {

        test("Should response with a 200 status code and data", async () => {

            await subjectinfoTest.delete(subjectInfo.mockSubjectInfo)

        })


        test("Should response with a 404 status code and error", async () => {

            await subjectinfoTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await subjectinfoTest.deleteFail()

        })

    })

})




