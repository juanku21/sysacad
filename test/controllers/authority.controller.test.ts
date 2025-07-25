

import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import { AuthorityService } from "../../src/services/authority.service"
import { AuthorityCreateInput, AuthorityUpdateInput, AuthorityValidator } from "../../src/validators/authority.validator"
import * as authority from "../mocks/authority.mock"


jest.mock('../../src/services/authority.service', () => ({
    AuthorityService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(AuthorityService)

class AuthorityControllerTest extends BaseControllerTest <typeof mockedService, AuthorityService> {

    constructor(){
        super(mockedService, "/api/authority", AuthorityService, appTest)
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



const authorityBadInput : object = {
    nombre: "Alumno"
}

const authorityCreateInput : AuthorityCreateInput = {
    name: "Tincho",
    last_name: "Mercado",
    email: "tinchomerca@mail.com",
    password: "tincho1234",
    cuil: 83273732,
    phone: 90238237,
    facultyId: "dn3d2w289s",
    tuition: 200,
    recruitment: new Date()
}


const authorityUpdateInput : AuthorityUpdateInput = {
    name: "Tincho"
}


const authorityTest = new AuthorityControllerTest()

describe("Authority controller", () => {


    describe("GET /authority (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            await authorityTest.get(authority.mockAuthorityArray)

        })

        
        test("Should response with a 503 status code and error", async () => {

            await authorityTest.getFail()

        })

    })


    describe("GET /authority (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

           await authorityTest.getById(authority.mockAuthorityWithRelations)

        })


        test("Should response with a 404 status code and error", async () => {

            await authorityTest.getByIdNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

           await authorityTest.getByIdFail()

        })

    })


    describe("POST /authority", () => {

        test("Should response with a 201 status code and data", async () => {

            await authorityTest.create(authority.mockAuthority, authorityCreateInput)

        })

        test("Should response with a 400 status code and message", async () => {

            await authorityTest.createBadRequest(authorityBadInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await authorityTest.createFail(authorityCreateInput)

        })

    })


    describe("PUT /authority", () => {

        test("Should response with a 200 status code and data", async () => {

            await authorityTest.put(authority.mockAuthority, authorityUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await authorityTest.putBadRequestInput(authorityBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await authorityTest.putNotFound(authorityUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await authorityTest.putFail(authorityUpdateInput)

        })

    })


    describe("PATCH /authority", () => {

        test("Should response with a 200 status code and data", async () => {

            await authorityTest.patch(authority.mockAuthority, authorityUpdateInput)

        })


        test("Should response with a 400 status code and message", async () => {

            await authorityTest.patchBadRequestInput(authorityBadInput)

        })

        test("Should response with a 404 status code and error", async () => {

            await authorityTest.patchNotFound(authorityUpdateInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await authorityTest.patchFail(authorityUpdateInput)

        })

    })


    describe("DELETE /authority", () => {

        test("Should response with a 200 status code and data", async () => {

            await authorityTest.delete(authority.mockAuthority)

        })


        test("Should response with a 404 status code and error", async () => {

            await authorityTest.deleteNotFound()

        })

        test("Should response with a 503 status code and error", async () => {

            await authorityTest.deleteFail()

        })

    })

})




