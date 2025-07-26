import { Prisma, StudyPlan } from "@prisma/client"
import { StudyPlanWithRelations } from "../types"
import { StudyPlanRepository } from "../repositories/studyplan.repository"


const repository = new StudyPlanRepository()

export class StudyPlanService {

    public static async get() : Promise<StudyPlan[]> {
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de los planes de estudio: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<StudyPlanWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener el plan de estudio solicitado: ${error}`)
        }
    }

    public static async create(studyPlan : Prisma.StudyPlanCreateInput) : Promise<StudyPlan> {
        try {
            const result = await repository.create(studyPlan)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear un nuevo plan de estudio: ${error}`)
        }
    }

    public static async update(id : number, studyPlan : Prisma.StudyPlanUpdateInput) : Promise<StudyPlan>  {
        try {
            const studyPlanExists = await repository.getById(id)

            if (studyPlanExists === null) {
                throw new Error("El plan de estudio que desea actualizar no existe")    
            }

            const result = await repository.update(id, studyPlan)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar el plan de estudio solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<StudyPlan> {
        try {
            const finalExamExists = await repository.getById(id)

            if (finalExamExists === null) {
                throw new Error("El plan de estudio que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar el plan de estudio solicitada: ${error}`)
        }

    }

}