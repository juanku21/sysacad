
import { Request, Response, RequestHandler } from "express"
import { SubjectDictationService } from "../services/subjectDictation.service"
import { SubjectDictationValidator } from "../validators/subjectDictation.validator"
import { IdEncrypter } from "../utils/encryption"


export class SubjectDictationController {

    public static get : RequestHandler = async (req : Request, res : Response) => {
        try {
            const result = await SubjectDictationService.get()

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
            const result = await SubjectDictationService.getById(id)

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

        const city = req.body

        if (!SubjectDictationValidator.create(city)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {
            const result = await SubjectDictationService.create(city)

            const resultSafe = IdEncrypter.encodeData(result)

            res.status(201).json(resultSafe)
        } 
        catch (error : any) {
            res.status(503).json({error: `${error.message}`})
        }

    }

    public static update : RequestHandler = async (req : Request, res : Response) => {

        const city = req.body

        const id = IdEncrypter.decodeUUID(req.params.id)


        if (!SubjectDictationValidator.update(city)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {
            const result = await SubjectDictationService.update(id, city)

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
            
            const result = await SubjectDictationService.delete(id)

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