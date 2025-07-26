import { Prisma, FinalExam } from "@prisma/client"
import { FinalExamWithRelations } from "../types"
import { FinalExamRepository } from "../repositories/finalExam.repository"


const repository = new FinalExamRepository()

export class FinalExamService {

    public static async get() : Promise<FinalExam[]> {
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de examenes finales: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<FinalExamWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener el examen final solicitado: ${error}`)
        }
    }

    public static async create(finalExam : Prisma.FinalExamCreateInput) : Promise<FinalExam> {
        try {
            const result = await repository.create(finalExam)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear un nuevo examen final: ${error}`)
        }
    }

    public static async update(id : number, finalExam : Prisma.FinalExamUpdateInput) : Promise<FinalExam>  {
        try {
            const finalExamExists = await repository.getById(id)

            if (finalExamExists === null) {
                throw new Error("El examen final que desea actualizar no existe")    
            }

            const result = await repository.update(id, finalExam)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar el examen final solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<FinalExam> {
        try {
            const finalExamExists = await repository.getById(id)

            if (finalExamExists === null) {
                throw new Error("El examen final que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar el examen final solicitada: ${error}`)
        }

    }

}