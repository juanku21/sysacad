

import { Request, Response, RequestHandler } from "express"
import { FinalExamService } from "../services/finalExam.service"
import { FinalExamValidator } from "../validators/finalExam.validator"
import { IdEncrypter } from "../utils/encryption"
import { FinalExamMapper } from "../mapping/finalExam.mapper"

export class FinalExamController {

    public static get : RequestHandler = async (req : Request, res : Response) => {
        try {
            const result = await FinalExamService.get()

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
            const result = await FinalExamService.getById(id)

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

        const finalExam = req.body

        finalExam.date = new Date(finalExam.date)

        if (!FinalExamValidator.create(finalExam)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {

            const finalExamEntity = FinalExamMapper.fromDTOtoEntityCreate(finalExam)

            const result = await FinalExamService.create(finalExamEntity)

            const resultSafe = IdEncrypter.encodeData(result)

            res.status(201).json(resultSafe)
        } 
        catch (error : any) {
            res.status(503).json({error: `${error.message}`})
        }

    }

    public static update : RequestHandler = async (req : Request, res : Response) => {

        const finalExam = req.body

        const id = IdEncrypter.decodeUUID(req.params.id)

        if (finalExam.date) {
            finalExam.date = new Date(finalExam.date)
        }

        if (!FinalExamValidator.update(finalExam)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {

            const finalExamEntity = FinalExamMapper.fromDTOtoEntityUpdate(finalExam)

            const result = await FinalExamService.update(id, finalExamEntity)

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
            
            const result = await FinalExamService.delete(id)

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