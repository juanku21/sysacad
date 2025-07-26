

import { Request, Response, RequestHandler } from "express"
import { AuthorityService } from "../services/authority.service"
import { AuthorityValidator } from "../validators/authority.validator"
import { AuthorityMapper } from "../mapping/authority.mapper"
import { IdEncrypter } from "../utils/encryption"


export class AuthorityController {

    public static get : RequestHandler = async (req : Request, res : Response) => {
        try {
            const result = await AuthorityService.get()

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
            const result = await AuthorityService.getById(id)

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

        const authority = req.body

        authority.recruitment = new Date(authority.recruitment)

        if (!AuthorityValidator.create(authority)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {

            const authorityEntity = AuthorityMapper.fromDTOtoEntityCreate(authority)

            const result = await AuthorityService.create(authorityEntity)

            const resultSafe = IdEncrypter.encodeData(result)

            res.status(201).json(resultSafe)
        } 
        catch (error : any) {
            res.status(503).json({error: `${error.message}`})
        }

    }

    public static update : RequestHandler = async (req : Request, res : Response) => {

        const authority = req.body

        const id = IdEncrypter.decodeUUID(req.params.id)

        if (authority.recruitment) {
            authority.recruitment = new Date(authority.recruitment)
        }

        if (!AuthorityValidator.update(authority)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {

            const authorityEntity = AuthorityMapper.fromDTOtoEntityUpdate(authority)

            const result = await AuthorityService.update(id, authorityEntity)

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
            
            const result = await AuthorityService.delete(id)

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