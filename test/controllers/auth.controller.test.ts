
import { ServerHTTP } from "../../src/index"
import { BaseControllerTest } from "../utils/baseControllerTest"
import request from "supertest"
import { UserService } from "../../src/services/user.service"
import { JWT } from "../../src/utils/jwt"
import { UserWithRelations } from "../../src/types"
import * as mock from "../mocks/user.mock"


jest.mock('../../src/services/user.service', () => ({
    UserService: {
        getByEmail: jest.fn(),
        authenticate: jest.fn(),
        authorize: jest.fn()
    }
}))

jest.mock('../../src/utils/jwt', () => ({
    JWT: {
        generate: jest.fn()
    }
}))


const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(UserService)
const mockedToken = jest.mocked(JWT)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b21pbW9AbWFpbC5jb20iLCJyb2xlIjpbIlRlYWNoZXIiXSwiaWF0IjoxNzUyODA4NzYxLCJleHAiOjE3NTI4MTIzNjF9.HHnhSF4AMwr-R9wijGNjpabn2suhIqxGQDv3vtCbFs8'


class AuthControllerTest extends BaseControllerTest <typeof mockedService, UserService> {

    constructor(){
        super(mockedService, "/api/auth/login", UserService, appTest)
    }


    public async login(mockData : UserWithRelations, input : object, token : string) : Promise<void> {
    
        (this.service as any).authenticate.mockResolvedValue(mockData)
        mockedService.authorize.mockResolvedValue(['Teacher'])
        mockedToken.generate.mockReturnValue(token)
        
        const response = await request(this.app.getApp()).post(this.route).send(input)
        
        expect(response.statusCode).toBe(200)

        expect(response.body).toEqual({token: token})

        expect((this.service as any).authenticate).toHaveBeenCalled()
        expect((this.service as any).authorize).toHaveBeenCalled()
    
    }

    public async loginBadRequest(input : object) : Promise<void> {

        (this.service as any).authenticate.mockRejectedValue(new Error("Fallo de autenticación: La contraseña proporcionada es incorrecta"))
        
        const response = await request(this.app.getApp()).post(this.route).send(input)
        
        expect(response.statusCode).toBe(401)

        expect(response.body.error).toEqual('Fallo de autenticación: La contraseña proporcionada es incorrecta')
        
        expect((this.service as any).authenticate).toHaveBeenCalled()

    }


    public async loginNotFound(input : object) : Promise<void> {
    
        (this.service as any).authenticate.mockRejectedValue(new Error("Fallo de autenticación: El usuario con el email proporcionado no existe"))
        
        const response = await request(this.app.getApp()).post(this.route).send(input)

        expect(response.statusCode).toBe(404)

        expect(response.body.error).toEqual("Fallo de autenticación: El usuario con el email proporcionado no existe")
        
        expect((this.service as any).authenticate).toHaveBeenCalled()

    }


    public async loginFail(input : object) : Promise<void> {
    
        (this.service as any).authenticate.mockRejectedValue(new Error("Fallo de autenticación: Error inesperado"))
        
        const response = await request(this.app.getApp()).post(this.route).send(input)

        expect(response.statusCode).toBe(503)

        expect(response.body.error).toEqual("Fallo de autenticación: Error inesperado")
        
        expect((this.service as any).authenticate).toHaveBeenCalled()
    
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



const loginInput : object = {
    email: "tomimo@mail.com",
    password: "camicami123"
}

const loginBadInput : object = {
    email: "tomimo@mail.com",
    password: "holahola123"
}


const authTest = new AuthControllerTest()


describe("Auth controller", () => {


    describe("POST /auth (login)", () => {

        test("Should response with a 200 status code and access token", async () => {

            await authTest.login(mock.user, loginInput, token)

        })

        test("Should response with a 400 status code and message", async () => {

            await authTest.loginBadRequest(loginBadInput)

        })

        test("Should response with a 404 status code and message", async () => {

            await authTest.loginNotFound(loginInput)

        })

        test("Should response with a 503 status code and error", async () => {

            await authTest.loginFail(loginInput)

        })

    })


})




