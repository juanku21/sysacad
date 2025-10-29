

import { Request, Response, RequestHandler } from "express"
import { PositionCategoryService } from "../services/positionCategory.service"
import { PositionCategoryValidator } from "../validators/positionCategory.validator"
import { IdEncrypter } from "../utils/encryption"

export class PositionCategoryController {

    public static get : RequestHandler = async (req : Request, res : Response) => {
        try {
            
            let result : object[]


            if (typeof req.headers['x-page'] == "string" && typeof req.headers['x-per-page'] == "string") {

                const pageNumber : number = parseInt(req.headers['x-page'])
                const pageSize : number = parseInt(req.headers['x-per-page'])

                result = await PositionCategoryService.get(pageNumber, pageSize)

                typeof req.headers['x-filters'] == 'string' ? result = await PositionCategoryService.getFiltered(req.headers['x-filters'], pageNumber, pageSize) : result = await PositionCategoryService.get(pageNumber, pageSize)
            
            }
            else {

                typeof req.headers['x-filters'] == 'string' ? result = await PositionCategoryService.getFiltered(req.headers['x-filters']) : result = await PositionCategoryService.get()

            }


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
            const result = await PositionCategoryService.getById(id)

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

        const positionCategory = req.body

        if (!PositionCategoryValidator.create(positionCategory)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {


            const result = await PositionCategoryService.create(positionCategory)

            const resultSafe = IdEncrypter.encodeData(result)

            res.status(201).json(resultSafe)
        } 
        catch (error : any) {
            res.status(503).json({error: `${error.message}`})
        }

    }

    public static update : RequestHandler = async (req : Request, res : Response) => {

        const positionCategory = req.body

        const id = IdEncrypter.decodeUUID(req.params.id)

        if (!PositionCategoryValidator.update(positionCategory)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {


            const result = await PositionCategoryService.update(id, positionCategory)

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
            
            const result = await PositionCategoryService.delete(id)

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