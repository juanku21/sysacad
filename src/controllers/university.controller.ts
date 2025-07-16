
import { Request, Response, RequestHandler } from "express"
import { UniversityService } from "../services/university.service"
import { UniversityValidator } from "../validators/university.validator"
import { IdEncrypter } from "../utils/encryption"


export class UniversityController {

    public static get : RequestHandler = async (req : Request, res : Response) => {
        try {
            const result = await UniversityService.get()

            const resultSafe = result.map(record => IdEncrypter.encodeData(record))

            res.status(200).json(resultSafe)
        }
        catch (error : any) {
            res.status(503).json({error: `${error.message}`})
        }
    }

    public static getById : RequestHandler = async (req : Request, res : Response) => {

        const id = IdEncrypter.decodeUUID(req.params.id)

        try {
            const result = await UniversityService.getById(id)

            if (result === null) {
                throw new Error('El recurso con el ID solicitado no existe')
            }

            const resultSafe = IdEncrypter.encodeData(result)

            res.status(200).json(resultSafe)
        }
        catch (error : any) {

            if (error.message === 'El recurso con el ID solicitado no existe') {
                res.status(404).json({error: `${error.message}`})
            }
            else{
                res.status(503).json({error: `${error.message}`})
            }

        }
    }


    public static create : RequestHandler = async (req : Request, res : Response) => {

        const university = req.body

        if (!UniversityValidator.create(university)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {
            const result = await UniversityService.create(university)

            const resultSafe = IdEncrypter.encodeData(result)

            res.status(201).json(resultSafe)
        } 
        catch (error : any) {
            res.status(503).json({error: `${error.message}`})
        }

    }

    public static update : RequestHandler = async (req : Request, res : Response) => {

        const university = req.body

        const id = IdEncrypter.decodeUUID(req.params.id)


        if (!UniversityValidator.update(university)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {
            const result = await UniversityService.update(id, university)

            if (result === null) {
                throw new Error('El recurso que desea actualizar no existe')
            }

            const resultSafe = IdEncrypter.encodeData(result)

            res.status(200).json(resultSafe)
        } 
        catch (error : any) {
            
            if (error.message == 'El recurso que desea actualizar no existe') {
                res.status(404).json({error: `${error.message}`})
            }
            else{
                res.status(503).json({error: `${error.message}`})
            }
        }

    }

    public static delete : RequestHandler = async (req : Request, res : Response) => {


        const id = IdEncrypter.decodeUUID(req.params.id)


        try {
            
            const result = await UniversityService.delete(id)

            if (result === null) {
                throw new Error('El recurso que desea eliminar no existe')
            }

            const resultSafe = IdEncrypter.encodeData(result)

            res.status(200).json(resultSafe)

        } 
        catch (error : any) {
            
            if (error.message == 'El recurso que desea eliminar no existe') {
                res.status(404).json({error: `${error.message}`})
            }
            else{
                res.status(503).json({error: `${error.message}`})
            }
        }
    }

}