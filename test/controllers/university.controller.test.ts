
import request from "supertest"
import { ServerHTTP } from "../../src/index"
import { UniversityService } from "../../src/services/university.service"
import { dateObjectTransformer, dateObjectArrayTransformer } from "../utils/dateTransformer"
import { mockUniversity, mockUniversityWithRelations, mockUniversityArray, inputCreate, inputUpdate } from "../mocks/university.mock"

jest.mock('../../src/services/university.service', () => ({
    UniversityService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

beforeEach(async () => {
    jest.clearAllMocks()
})
        

afterAll(async () => {
    appTest.stop()
})


describe("University controller", () => {

    const mockedService = jest.mocked(UniversityService)


    describe("GET /university (all)", () => {


        test("Should response with a 200 status code and data", async () => {

            mockedService.get.mockResolvedValue(mockUniversityArray)

            const response = await request(appTest.getApp()).get("/api/university").send()

            expect(response.statusCode).toBe(200)

            expect(response.body).toEqual(dateObjectArrayTransformer(mockUniversityArray))
            expect(UniversityService.get).toHaveBeenCalled()

        })

        
        test("Should response with a 503 status code and error", async () => {

            mockedService.get.mockRejectedValue(new Error('Falló el servicio solicitado'))

            const response = await request(appTest.getApp()).get("/api/university").send()

            expect(response.statusCode).toBe(503)
            expect(response.body.error).toBe('Falló el servicio solicitado')
            expect(UniversityService.get).toHaveBeenCalled()

        })

    })


    describe("GET /university (unique)", () => {


        test("Should response with a 200 status code and data", async () => {

            mockedService.getById.mockResolvedValue(mockUniversityWithRelations)

            const response = await request(appTest.getApp()).get("/api/university/1").send()

            expect(response.statusCode).toBe(200)

            expect(response.body).toEqual(dateObjectTransformer(mockUniversityWithRelations))
            expect(UniversityService.getById).toHaveBeenCalled()

        })

        test("Should response with a 400 status code and message", async () => {

            const response = await request(appTest.getApp()).get("/api/university/hola").send()

            expect(response.statusCode).toBe(400)
            expect(response.body.error).toBe('El ID debe ser un número')

        })

        test("Should response with a 404 status code and error", async () => {

            mockedService.getById.mockResolvedValue(null)

            const response = await request(appTest.getApp()).get("/api/university/1").send()

            expect(response.statusCode).toBe(404)
            expect(response.body.error).toBe('El ID solicitado no existe')

            expect(UniversityService.getById).toHaveBeenCalled()
        })

        test("Should response with a 503 status code and error", async () => {

            mockedService.getById.mockRejectedValue(new Error('Falló el servicio solicitado'))

            const response = await request(appTest.getApp()).get("/api/university/1").send()

            expect(response.statusCode).toBe(503)
            expect(response.body.error).toBe('Falló el servicio solicitado')

            expect(UniversityService.getById).toHaveBeenCalled()
        })

    })


    describe("POST /university", () => {

        test("Should response with a 200 status code and data", async () => {

            mockedService.create.mockResolvedValue(mockUniversity)

            const response = await request(appTest.getApp()).post("/api/university").send(inputCreate)

            expect(response.statusCode).toBe(200)

            expect(response.body).toEqual(dateObjectTransformer(mockUniversity))
            expect(UniversityService.create).toHaveBeenCalled()

        })

        test("Should response with a 400 status code and message", async () => {

            const response = await request(appTest.getApp()).post("/api/university").send({
                nombre: "Universidad de Mendoza",
                provincia: "Mendoza"
            })

            expect(response.statusCode).toBe(400)
            expect(response.body.error).toBe('El tipo de dato enviado no es correcto')

        })

        test("Should response with a 503 status code and error", async () => {

            mockedService.create.mockRejectedValue(new Error('Falló el servicio solicitado'))

            const response = await request(appTest.getApp()).post("/api/university").send(inputCreate)

            expect(response.statusCode).toBe(503)
            expect(response.body.error).toBe('Falló el servicio solicitado')

            expect(UniversityService.create).toHaveBeenCalled()
        })

    })


    describe("PATCH /university", () => {

        test("Should response with a 200 status code and data", async () => {

            mockedService.update.mockResolvedValue(mockUniversity)

            const response = await request(appTest.getApp()).patch("/api/university/1").send(inputUpdate)

            expect(response.statusCode).toBe(200)

            expect(response.body).toEqual(dateObjectTransformer(mockUniversity))
            expect(UniversityService.update).toHaveBeenCalled()

        })

        test("Should response with a 400 status code and message", async () => {

            const response = await request(appTest.getApp()).patch("/api/university/1").send({
                provincia: "Mendoza"
            })

            expect(response.statusCode).toBe(400)
            expect(response.body.error).toBe('El tipo de dato enviado no es correcto')

        })

        test("Should response with a 400 status code and message", async () => {

            const response = await request(appTest.getApp()).patch("/api/university/hola").send(inputUpdate)

            expect(response.statusCode).toBe(400)
            expect(response.body.error).toBe('El ID debe ser un número')

        })

        test("Should response with a 404 status code and error", async () => {

            mockedService.update.mockResolvedValue(null)

            const response = await request(appTest.getApp()).patch("/api/university/1").send(inputUpdate)

            expect(response.statusCode).toBe(404)
            expect(response.body.error).toBe(`La universidad que desea actualizar no existe`)

            expect(UniversityService.update).toHaveBeenCalled()
        })

        test("Should response with a 503 status code and error", async () => {

            mockedService.update.mockRejectedValue(new Error('Falló el servicio solicitado'))

            const response = await request(appTest.getApp()).patch("/api/university/1").send(inputCreate)

            expect(response.statusCode).toBe(503)
            expect(response.body.error).toBe('Falló el servicio solicitado')

            expect(UniversityService.update).toHaveBeenCalled()
        })

    })


    describe("DELETE /university", () => {

        test("Should response with a 200 status code and data", async () => {

            mockedService.delete.mockResolvedValue(mockUniversity)

            const response = await request(appTest.getApp()).delete("/api/university/1").send()

            expect(response.statusCode).toBe(200)

            expect(response.body).toEqual(dateObjectTransformer(mockUniversity))
            expect(UniversityService.delete).toHaveBeenCalled()

        })

        test("Should response with a 400 status code and message", async () => {

            const response = await request(appTest.getApp()).delete("/api/university/hola").send()

            expect(response.statusCode).toBe(400)
            expect(response.body.error).toBe("El ID debe ser un número")

        })

        test("Should response with a 404 status code and error", async () => {

            mockedService.delete.mockResolvedValue(null)

            const response = await request(appTest.getApp()).delete("/api/university/1").send()

            expect(response.statusCode).toBe(404)
            expect(response.body.error).toBe(`La universidad que desea eliminar no existe`)

            expect(UniversityService.delete).toHaveBeenCalled()
        })

        test("Should response with a 503 status code and error", async () => {

            mockedService.delete.mockRejectedValue(new Error('Falló el servicio solicitado'))

            const response = await request(appTest.getApp()).delete("/api/university/1").send()

            expect(response.statusCode).toBe(503)
            expect(response.body.error).toBe('Falló el servicio solicitado')

            expect(UniversityService.delete).toHaveBeenCalled()
        })

    })

})


