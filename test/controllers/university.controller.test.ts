
import request from "supertest"
import { ServerHTTP } from "../../src/index"
import { UniversityService } from "../../src/services/university.service"
import { dateObjectTransformer, dateObjectArrayTransformer } from "../utils/dateTransformer"
import { mockUniversity, mockUniversityWithRelations, mockUniversityArray } from "../mocks/university.mock"

jest.mock('../../src/services/university.service', () => ({
    UniversityService: {
        get: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}))


describe("University controller", () => {

    const appTest = ServerHTTP.getInstance()

    const mockedService = jest.mocked(UniversityService)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterAll(() => {
        appTest.stop()
    })


    describe("GET /university", () => {

        
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
            expect(response.body.error).toBe('Error: Falló el servicio solicitado')

        })

    })

})