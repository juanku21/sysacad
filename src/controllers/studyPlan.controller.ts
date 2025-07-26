


import { Request, Response, RequestHandler } from "express"
import { StudyPlanService } from "../services/studyPlan.service"
import { StudyPlanValidator } from "../validators/studyPlan.validator"
import { StudyPlanMapper } from "../mapping/studyPlan.mapper"
import { IdEncrypter } from "../utils/encryption"


export class StudyPlanController {

    public static get : RequestHandler = async (req : Request, res : Response) => {
        try {
            const result = await StudyPlanService.get()

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
            const result = await StudyPlanService.getById(id)

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

        const studyPlan = req.body

        if (!StudyPlanValidator.create(studyPlan)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {

            const studyPlanEntity = StudyPlanMapper.fromDTOtoEntityCreate(studyPlan)

            const result = await StudyPlanService.create(studyPlanEntity)

            const resultSafe = IdEncrypter.encodeData(result)

            res.status(201).json(resultSafe)
        } 
        catch (error : any) {
            res.status(503).json({error: `${error.message}`})
        }

    }

    public static update : RequestHandler = async (req : Request, res : Response) => {

        const studyPlan = req.body

        const id = IdEncrypter.decodeUUID(req.params.id)

        if (!StudyPlanValidator.update(studyPlan)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {

            const studyPlanEntity = StudyPlanMapper.fromDTOtoEntityUpdate(studyPlan)

            const result = await StudyPlanService.update(id, studyPlanEntity)

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
            
            const result = await StudyPlanService.delete(id)

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