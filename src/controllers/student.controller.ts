
import { Request, Response, RequestHandler } from "express"
import { StudentService } from "../services/student.service"
import { StudentValidator } from "../validators/student.validator"
import { IdEncrypter } from "../utils/encryption"
import { StudentMapper } from "../mapping/student.mapper"
import { HeaderStrategy } from "../utils/headerStrategy"


export class StudentController {

    public static get : RequestHandler = async (req : Request, res : Response) => {

        try {
        
            const strategy = new HeaderStrategy(StudentService)

            const result = await strategy.get(req)

            const resultSafe = result.map(record => IdEncrypter.encodeData(record))

            res.status(200).json(resultSafe)
        }
        catch (error : any) {
            if (
                error.message === 'El parámetro de filtros no es un JSON válido.' ||
                error.message === 'El JSON de filtros debe ser un array.' ||
                error.message === 'Cada filtro debe contener un "field" (string) y un "op" (string).'
            ) {
              res.status(400).json({error: `Error en el encabezado x-filters: ${error.message}`})
            }
            else if (
                error.message === 'El parámetro de ordenamiento no es un JSON válido.' ||
                error.message === 'El JSON de ordenamiento debe ser un array.' ||
                error.message === 'Cada objeto de ordenamiento debe contener un "field" (string) y un "order" (string).'
            ) {
                res.status(400).json({error: `Error en el encabezado x-sort: ${error.message}`})
            }
            else {
                res.status(503).json({error: `${error.message}`})    
            }
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


    public static getPDFReport : RequestHandler = async (req : Request, res : Response) => {

        const id = IdEncrypter.decodeUUID(req.params.id)

        try {
            const result = await StudentService.generateReportPDF(id)

            if (result === null) {
                throw new Error('El recurso con el ID solicitado no existe')
            }

            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `inline; filename="reporte_alumno_${req.params.id}.pdf"`)
            
            res.status(200).send(result)

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

}