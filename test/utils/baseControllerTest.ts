

import { ServerHTTP } from "../../src" 
import request from 'supertest'
import { dateObjectTransformer, dateObjectArrayTransformer } from "./dateTransformer"


export abstract class BaseControllerTest <TMock, TService> {

    protected readonly mock : TMock
    protected readonly service : TService
    protected readonly route : string
    private readonly app : ServerHTTP

    constructor(mock : TMock, route : string, service : TService, app : ServerHTTP){
        this.mock = mock
        this.route = route
        this.app = app
        this.service = service
    }

    // GET (all)

    public async get(mockData : object[]) : Promise<void> {

        (this.mock as any).get.mockResolvedValue(mockData)

        const response = await request(this.app.getApp()).get(this.route).send()

        expect(response.statusCode).toBe(200)

        expect(response.body).toEqual(dateObjectArrayTransformer(mockData))
        expect((this.service as any).get).toHaveBeenCalled()

    }

    public async getFail(){

        (this.mock as any).get.mockRejectedValue(new Error('Falló el servicio solicitado'))
        
        const response = await request(this.app.getApp()).get(this.route).send()

        expect(response.statusCode).toBe(503)
        expect(response.body.error).toBe('Falló el servicio solicitado')
        expect((this.service as any).get).toHaveBeenCalled()

    }


    // GET (unique)

    public async getById(mockData : object) : Promise<void> {

        (this.mock as any).getById.mockResolvedValue(mockData)
        
        const response = await request(this.app.getApp()).get(`${this.route}/1`).send()

        expect(response.statusCode).toBe(200)

        expect(response.body).toEqual(dateObjectTransformer(mockData))
        expect((this.service as any).getById).toHaveBeenCalled()

    }

    public async getByIdBadRequest() : Promise<void> {

        const response = await request(this.app.getApp()).get(`${this.route}/hola`).send()

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El ID debe ser un número')

    }

    public async getByIdNotFound() : Promise<void> {

        (this.mock as any).getById.mockResolvedValue(null)

        const response = await request(this.app.getApp()).get(`${this.route}/1`).send()

        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('El recurso con el ID solicitado no existe')

        expect((this.service as any).getById).toHaveBeenCalled()

    }

    public async getByIdFail(){

        (this.service as any).getById.mockRejectedValue(new Error('Falló el servicio solicitado'))

        const response = await request(this.app.getApp()).get(`${this.route}/1`).send()

        expect(response.statusCode).toBe(503)
        expect(response.body.error).toBe('Falló el servicio solicitado')

        expect((this.service as any).getById).toHaveBeenCalled()

    }


    // CREATE

    public async create(mockData : object, input : object) : Promise<void> {

        (this.mock as any).create.mockResolvedValue(mockData)

        const response = await request(this.app.getApp()).post(this.route).send(input)

        expect(response.statusCode).toBe(200)

        expect(response.body).toEqual(dateObjectTransformer(mockData))
        expect((this.service as any).create).toHaveBeenCalled()

    }

    public async createBadRequest(badInput : object) : Promise<void> {

        const response = await request(this.app.getApp()).post(this.route).send(badInput)

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('Los datos enviados son incorrectos')

    }

    public async createFail(input : object) : Promise<void> {

        (this.mock as any).create.mockRejectedValue(new Error('Falló el servicio solicitado'))

        const response = await request(this.app.getApp()).post(this.route).send(input)

        expect(response.statusCode).toBe(503)
        expect(response.body.error).toBe('Falló el servicio solicitado')

        expect((this.service as any).create).toHaveBeenCalled()

    }


    // PATCH

    public async patch(mockData : object, input : object) : Promise<void> {
        
        (this.mock as any).update.mockResolvedValue(mockData)

        const response = await request(this.app.getApp()).patch(`${this.route}/1`).send(input)

        expect(response.statusCode).toBe(200)

        expect(response.body).toEqual(dateObjectTransformer(mockData))
        expect((this.service as any).update).toHaveBeenCalled()

    }

    public async patchBadRequestInput(badInput : object) : Promise<void> {
        
        const response = await request(this.app.getApp()).patch(`${this.route}/1`).send(badInput)

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('Los datos enviados son incorrectos')

    }

    public async patchBadRequestId(input : object) : Promise<void> {
        
        const response = await request(this.app.getApp()).patch(`${this.route}/hola`).send(input)

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El ID debe ser un número')

    }

    public async patchNotFound(input : object) : Promise<void> {
        
        (this.mock as any).update.mockResolvedValue(null)

        const response = await request(this.app.getApp()).patch(`${this.route}/1`).send(input)

        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe(`El recurso que desea actualizar no existe`)

        expect((this.service as any).update).toHaveBeenCalled()

    }

    public async patchFail(input : object) : Promise<void> {
        
        (this.mock as any).update.mockRejectedValue(new Error('Falló el servicio solicitado'))

        const response = await request(this.app.getApp()).patch(`${this.route}/1`).send(input)

        expect(response.statusCode).toBe(503)
        expect(response.body.error).toBe('Falló el servicio solicitado')

        expect((this.service as any).update).toHaveBeenCalled()

    }


    // DELETE

    public async delete(mockData : object) : Promise<void> {

        (this.mock as any).delete.mockResolvedValue(mockData)

        const response = await request(this.app.getApp()).delete(`${this.route}/1`).send()

        expect(response.statusCode).toBe(200)

        expect(response.body).toEqual(dateObjectTransformer(mockData))
        expect((this.service as any).delete).toHaveBeenCalled()

    }

    public async deleteBadRequest() : Promise<void> {

        const response = await request(this.app.getApp()).delete(`${this.route}/hola`).send()

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe("El ID debe ser un número")

    }

    public async deleteNotFound() : Promise<void> {

        (this.mock as any).delete.mockResolvedValue(null)

        const response = await request(this.app.getApp()).delete(`${this.route}/1`).send()

        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe(`El recurso que desea eliminar no existe`)

        expect((this.service as any).delete).toHaveBeenCalled()

    }

    public async deleteFail() : Promise<void> {

        (this.mock as any).delete.mockRejectedValue(new Error('Falló el servicio solicitado'))

        const response = await request(this.app.getApp()).delete(`${this.route}/1`).send()

        expect(response.statusCode).toBe(503)
        expect(response.body.error).toBe('Falló el servicio solicitado')

        expect((this.service as any).delete).toHaveBeenCalled()
    }

}