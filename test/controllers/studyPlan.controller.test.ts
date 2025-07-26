import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { StudyPlanService } from "../../src/services/studyPlan.service"
import { StudyPlanCreateInput, StudyPlanUpdateInput, StudyPlanValidator } from "../../src/validators/studyPlan.validator"
import * as studyPlan from "../mocks/studyPlan.mock"


jest.mock('../../src/services/studyPlan.service', () => ({
    StudyPlanService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(StudyPlanService)

class StudyPlanControllerTest extends BaseControllerTest <typeof mockedService, StudyPlanService> {

    constructor(){
        super(mockedService, "/api/studyPlan", StudyPlanService, appTest)
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



const studyPlanBadInput : object = {
    nombre: "Alumno"
}

const studyPlanCreateInput : StudyPlanCreateInput = {

    description: "Materia no cursada",
    effective_from: 912,
    code: 9182018,
    duration: 4,
    career_id: "6754"
}


const studyPlanUpdateInput : StudyPlanUpdateInput = {
    description: "Materia no cursada"
}


const studyPlanTest = new StudyPlanControllerTest()

describe("StudyPlan controller", () => {


    describe("GET /studyPlan (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await studyPlanTest.get(studyPlan.mockStudyPlanArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await studyPlanTest.getFail()

        })

    })


    describe("GET /studyPlan (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

        await studyPlanTest.getById(studyPlan.mockStudyPlanWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await studyPlanTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

        await studyPlanTest.getByIdFail()

        })

    })


    describe("POST /studyPlan", () => {

        test("Should response with a 201 status code and data", async () => {

            await studyPlanTest.create(studyPlan.mockStudyPlan, studyPlanCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await studyPlanTest.createBadRequest(studyPlanBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await studyPlanTest.createFail(studyPlanCreateInput)

        })

    })


    describe("PUT /studyPlan", () => {

        test("Should response with a 200 status code and data", async () => {

            await studyPlanTest.put(studyPlan.mockStudyPlan, studyPlanUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await studyPlanTest.putBadRequestInput(studyPlanBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await studyPlanTest.putNotFound(studyPlanUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await studyPlanTest.putFail(studyPlanUpdateInput)

        })

    })


    describe("PATCH /studyPlan", () => {

        test("Should response with a 200 status code and data", async () => {

            await studyPlanTest.patch(studyPlan.mockStudyPlan, studyPlanUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await studyPlanTest.patchBadRequestInput(studyPlanBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await studyPlanTest.patchNotFound(studyPlanUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await studyPlanTest.patchFail(studyPlanUpdateInput)

        })

    })


    describe("DELETE /studyPlan", () => {

        test("Should response with a 200 status code and data", async () => {

            await studyPlanTest.delete(studyPlan.mockStudyPlan)

        })


        test("Should response with a 404 status code and error", async () => {

            await studyPlanTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await studyPlanTest.deleteFail()

        })

    })

})