
import { Request, Response, RequestHandler } from "express"
import { CorrelativityService } from "../services/correlativity.service"
import { CorrelativityValidator } from "../validators/correlativity.validator"
import { CorrelativityMapper } from "../mapping/correlativity.mapper"
import { IdEncrypter } from "../utils/encryption"


export class CorrelativityController {

    public static get : RequestHandler = async (req : Request, res : Response) => {
        try {
            const result = await CorrelativityService.get()

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
            const result = await CorrelativityService.getById(id)

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

        const correlativity = req.body

        if (!CorrelativityValidator.create(correlativity)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {

            const correlativityEntity = CorrelativityMapper.fromDTOtoEntityCreate(correlativity)

            const result = await CorrelativityService.create(correlativityEntity)

            const resultSafe = IdEncrypter.encodeData(result)

            res.status(201).json(resultSafe)
        } 
        catch (error : any) {
            res.status(503).json({error: `${error.message}`})
        }

    }

    public static update : RequestHandler = async (req : Request, res : Response) => {

        const correlativity = req.body

        const id = IdEncrypter.decodeUUID(req.params.id)

        if (!CorrelativityValidator.update(correlativity)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {

            const correlativityEntity = CorrelativityMapper.fromDTOtoEntityUpdate(correlativity)

            const result = await CorrelativityService.update(id, correlativityEntity)

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
            
            const result = await CorrelativityService.delete(id)

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