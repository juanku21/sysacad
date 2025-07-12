
import { Request, Response, RequestHandler } from "express"
import { UniversityService } from "../services/university.service"
import { UniversityValidator } from "../validators/university.validator"

export class UniversityController {

    public static get : RequestHandler = async (req : Request, res : Response) => {
        try {
            const result = await UniversityService.get()
            res.status(200).json(result)
        }
        catch (error : any) {
            res.status(503).json({error: `${error.message}`})
        }
    }

    public static getById : RequestHandler = async (req : Request, res : Response) => {

        const {id} = req.params

        const er = /^[-+]?\d+$/

        if (!(er.test(id))) {
            res.status(400).json({error: "El ID debe ser un número"})
        }

        try {
            const result = await UniversityService.getById(parseInt(id))

            if (result === null) {
                throw new Error('El recurso con el ID solicitado no existe')
            }

            res.status(200).json(result)
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
            res.status(200).json(result)
        } 
        catch (error : any) {
            res.status(503).json({error: `${error.message}`})
        }

    }

    public static update : RequestHandler = async (req : Request, res : Response) => {

        const {id} = req.params
        const university = req.body

        const er = /^[-+]?\d+$/

        if (!(er.test(id))) {
            res.status(400).json({error: "El ID debe ser un número"})
        }

        if (!UniversityValidator.update(university)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {
            const result = await UniversityService.update(parseInt(id), university)

            if (result === null) {
                throw new Error('El recurso que desea actualizar no existe')
            }

            res.status(200).json(result)
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

        const {id} = req.params

        const er = /^[-+]?\d+$/

        if (!(er.test(id))) {
            res.status(400).json({error: "El ID debe ser un número"})
        }

        try {
            const result = await UniversityService.delete(parseInt(id))

            if (result === null) {
                throw new Error('El recurso que desea eliminar no existe')
            }

            res.status(200).json(result)
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