


import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { FacultyService } from "../../src/services/faculty.service"
import { FacultyCreateInput, FacultyUpdateInput } from "../../src/validators/faculty.validator"
import * as faculty from "../mocks/faculty.mock"


jest.mock('../../src/services/faculty.service', () => ({
    FacultyService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(FacultyService)

class FacultyControllerTest extends BaseControllerTest <typeof mockedService, FacultyService> {

    constructor(){
        super(mockedService, "/api/faculty", FacultyService, appTest)
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



const facultyBadInput : object = {
    nombre: "Alumno",
    universidad: "UTN",
    legajo: 231,
    provincia: "Mendoza"
}


const facultyCreateInput : FacultyCreateInput = {
    name: "Facultad de Informática",
    code: 9812,
    email: "facultad@mail.com",
    phone: 77312832,
    street: "Urquiza",
    number: 872,
    cityId: "awdnwe29e2",
    university_id: "dnxwiedh29",
}

const facultyUpdateInput : FacultyUpdateInput = {
    code: 9812,
    cityId: "awdnwe29e2",
    university_id: "dnxwiedh29",
}



const facultyTest = new FacultyControllerTest()

describe("Faculty controller", () => {


    describe("GET /faculty (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await facultyTest.get(faculty.mockFacultyArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await facultyTest.getFail()

        })

    })


    describe("GET /faculty (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

           await facultyTest.getById(faculty.mockFacultyWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await facultyTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

           await facultyTest.getByIdFail()

        })

    })


    describe("POST /faculty", () => {

        test("Should response with a 201 status code and data", async () => {

            await facultyTest.create(faculty.mockFaculty, facultyCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await facultyTest.createBadRequest(facultyBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await facultyTest.createFail(facultyCreateInput)

        })

    })


    describe("PUT /faculty", () => {

        test("Should response with a 200 status code and data", async () => {

            await facultyTest.put(faculty.mockFaculty, facultyUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await facultyTest.putBadRequestInput(facultyBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await facultyTest.putNotFound(facultyUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await facultyTest.putFail(facultyUpdateInput)

        })

    })


    describe("PATCH /faculty", () => {

        test("Should response with a 200 status code and data", async () => {

            await facultyTest.patch(faculty.mockFaculty, facultyUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await facultyTest.patchBadRequestInput(facultyBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await facultyTest.patchNotFound(facultyUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await facultyTest.patchFail(facultyUpdateInput)

        })

    })


    describe("DELETE /faculty", () => {

        test("Should response with a 200 status code and data", async () => {

            await facultyTest.delete(faculty.mockFaculty)

        })


        test("Should response with a 404 status code and error", async () => {

            await facultyTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await facultyTest.deleteFail()

        })

    })

})




