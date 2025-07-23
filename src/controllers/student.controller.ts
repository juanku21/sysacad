

import { Request, Response, RequestHandler } from "express"
import { StudentService } from "../services/student.service"
import { StudentValidator } from "../validators/student.validator"
import { IdEncrypter } from "../utils/encryption"
import { StudentMapper } from "../mapping/student.mapper"

export class StudentController {

    public static get : RequestHandler = async (req : Request, res : Response) => {
        try {
            const result = await StudentService.get()

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
            const result = await StudentService.getById(id)

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

        const student = req.body

        if (!StudentValidator.create(student)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {

            const studentEntity = StudentMapper.fromDTOtoEntityCreate(student)

            const result = await StudentService.create(studentEntity)

            const resultSafe = IdEncrypter.encodeData(result)

            res.status(201).json(resultSafe)
        } 
        catch (error : any) {
            res.status(503).json({error: `${error.message}`})
        }

    }

    public static update : RequestHandler = async (req : Request, res : Response) => {

        const student = req.body

        const id = IdEncrypter.decodeUUID(req.params.id)


        if (!StudentValidator.update(student)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {

            const studentEntity = StudentMapper.fromDTOtoEntityUpdate(student)

            const result = await StudentService.update(id, studentEntity)

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
            
            const result = await StudentService.delete(id)

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