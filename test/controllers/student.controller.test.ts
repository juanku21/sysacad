

import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { StudentService } from "../../src/services/student.service"
import { StudentCreateInput, StudentUpdateInput } from "../../src/validators/student.validator"
import * as student from "../mocks/student.mock"


jest.mock('../../src/services/student.service', () => ({
    StudentService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(StudentService)

class StudentControllerTest extends BaseControllerTest <typeof mockedService, StudentService> {

    constructor(){
        super(mockedService, "/api/student", StudentService, appTest)
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



const studentBadInput : object = {
    nombre: "Alumno",
    universidad: "UTN",
    legajo: 231,
    provincia: "Mendoza"
}


const studentCreateInput : StudentCreateInput = {
    name: "Tomi",
    last_name: "Montes",
    email: "tomi@mail.com",
    password: "reythompson",
    cuil: 12345678,
    phone: 87654321,
    facultyId: "dn3d2w289s",
    file: 1234,
    career_id: "whhw281u1s"
}

const studentUpdateInput : StudentUpdateInput = {
    email: "tomi@mail.com",
    password: "reythompson"
}


const studentTest = new StudentControllerTest()

describe("Student controller", () => {


    describe("GET /student (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await studentTest.get(student.mockStudentArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await studentTest.getFail()

        })

    })


    describe("GET /student (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

           await studentTest.getById(student.mockStudentWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await studentTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

           await studentTest.getByIdFail()

        })

    })


    describe("POST /student", () => {

        test("Should response with a 201 status code and data", async () => {

            await studentTest.create(student.mockStudent, studentCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await studentTest.createBadRequest(studentBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await studentTest.createFail(studentCreateInput)

        })

    })


    describe("PUT /student", () => {

        test("Should response with a 200 status code and data", async () => {

            await studentTest.put(student.mockStudent, studentUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await studentTest.putBadRequestInput(studentBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await studentTest.putNotFound(studentUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await studentTest.putFail(studentUpdateInput)

        })

    })


    describe("PATCH /student", () => {

        test("Should response with a 200 status code and data", async () => {

            await studentTest.patch(student.mockStudent, studentUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await studentTest.patchBadRequestInput(studentBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await studentTest.patchNotFound(studentUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await studentTest.patchFail(studentUpdateInput)

        })

    })


    describe("DELETE /student", () => {

        test("Should response with a 200 status code and data", async () => {

            await studentTest.delete(student.mockStudent)

        })


        test("Should response with a 404 status code and error", async () => {

            await studentTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await studentTest.deleteFail()

        })

    })

})




