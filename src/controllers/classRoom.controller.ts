

import { Request, Response, RequestHandler } from "express"
import { ClassRoomService } from "../services/classRoom.service"
import { ClassRoomValidator } from "../validators/classRoom.validator"
import { IdEncrypter } from "../utils/encryption"
import { ClassRoomMapper } from "../mapping/classRoom.mapper"

export class ClassRoomController {

    public static get : RequestHandler = async (req : Request, res : Response) => {
        try {
            const result = await ClassRoomService.get()

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
            const result = await ClassRoomService.getById(id)

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

        const classRoom = req.body

        if (!ClassRoomValidator.create(classRoom)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {

            const classRoomEntity = ClassRoomMapper.fromDTOtoEntityCreate(classRoom)

            const result = await ClassRoomService.create(classRoomEntity)

            const resultSafe = IdEncrypter.encodeData(result)

            res.status(201).json(resultSafe)
        } 
        catch (error : any) {
            res.status(503).json({error: `${error.message}`})
        }

    }

    public static update : RequestHandler = async (req : Request, res : Response) => {

        const classRoom = req.body

        const id = IdEncrypter.decodeUUID(req.params.id)

        if (classRoom.date) {
            classRoom.date = new Date(classRoom.date)
        }

        if (!ClassRoomValidator.update(classRoom)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {

            const classRoomEntity = ClassRoomMapper.fromDTOtoEntityUpdate(classRoom) 

            const result = await ClassRoomService.update(id, classRoomEntity) 

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
            
            const result = await ClassRoomService.delete(id)

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