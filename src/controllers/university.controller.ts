
import { Request, Response } from "express";
import { UniversityService } from "../services/university.service";

export class UniversityController {

    public static async get(req : Request, res : Response) {
        try {
            const result = await UniversityService.get()
            res.status(200).json(result)
        }
        catch (error : any) {
            res.status(503).json({error: `${error.message}`})
        }
    }

    public static async getById(req : Request, res : Response) {

        const {id} = req.params

        const er = /^[-+]?\d+$/

        if (!(er.test(id))) {
            return res.status(400).json({error: "El ID debe ser un número"})
        }

        try {
            const result = await UniversityService.getById(parseInt(id))

            if (result === null) {
                throw new Error('El ID solicitado no existe')
            }

            res.status(200).json(result)
        }
        catch (error : any) {

            if (error.message === 'El ID solicitado no existe') {
                return res.status(404).json({error: `${error.message}`})
            }
            else{
                return res.status(503).json({error: `${error.message}`})
            }

        }
    }

    public static async create(req : Request, res : Response) {

    }

    public static async update(req : Request, res : Response) {

    }

    public static async delete(req : Request, res : Response) {

    }

}