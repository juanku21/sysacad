

import httpMocks from 'node-mocks-http'
import { Request, Response, NextFunction } from 'express'
import { Auth } from "../src/middlewares/auth"
import { JWT } from "../../src/utils/jwt"
import { UserService } from "../src/services/user.service"


jest.mock('../../src/services/user.service', () => ({
    UserService: {
        getByEmail: jest.fn(),
        authenticate: jest.fn(),
        authorize: jest.fn()
    }
}))

jest.mock('../../src/utils/jwt', () => ({
    JWT: {
        verify: jest.fn()
    }
}))

const buildResponse = () => {
  const response = httpMocks.createResponse()
  // Simula el encadenamiento de métodos, algo que Jest hace bien
  response.status = jest.fn(() => response)
  response.json = jest.fn(() => response)
  return response
}


// const mockedService = jest.mocked(UserService)
// const mockedToken = jest.mocked(JWT)
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b21pbW9AbWFpbC5jb20iLCJyb2xlIjpbIlRlYWNoZXIiXSwiaWF0IjoxNzUyODA4NzYxLCJleHAiOjE3NTI4MTIzNjF9.HHnhSF4AMwr-R9wijGNjpabn2suhIqxGQDv3vtCbFs8'


// const loginInput : object = {
//     email: "tomimo@mail.com",
//     password: "camicami123"
// }

// const loginBadInput : object = {
//     email: "tomimo@mail.com",
//     password: "holahola123"
// }



describe("Auth middleware", () => {

    let req : Request, res : Response, next : NextFunction

    beforeEach(async () => {
        jest.clearAllMocks()

        req = httpMocks.createRequest()
        res = buildResponse()
        next = jest.fn()
    })


    describe("Verify Token Middleware", () => {

        test('should call the next function', () => {

            req.body = {token: token}; 

            Auth.verifyToken(req, res, next)

            // Verifica que `next` fue llamado sin argumentos (lo cual indica éxito)
            expect(next).toHaveBeenCalledTimes(1)
            expect(next).toHaveBeenCalledWith()
        })

        test('should response with 401 status code and error (token required)', () => {

            req.body = {}

            Auth.verifyToken(req, res, next)

            // Verifica que `next` no fue llamado
            expect(next).not.toHaveBeenCalled();
            // Verifica el estado y el cuerpo de la respuesta de error
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Mensaje de error' })
        })

        test('should response with 401 status code and error (invalid token)', () => {

            req.body = {}

            Auth.verifyToken(req, res, next)

            // Verifica que `next` no fue llamado
            expect(next).not.toHaveBeenCalled();
            // Verifica el estado y el cuerpo de la respuesta de error
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Mensaje de error' })
        })

        test('should response with 503 status code and error', () => {

            req.body = {}

            Auth.verifyToken(req, res, next)

            // Verifica que `next` no fue llamado
            expect(next).not.toHaveBeenCalled();
            // Verifica el estado y el cuerpo de la respuesta de error
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Mensaje de error' })
        })

    })

})




