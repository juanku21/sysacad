import { Prisma, FinalExamRegistration } from "@prisma/client"
import { FinalExamRegistrationWithRelations } from "../types"
import { FinalExamRegistrationRepository } from "../repositories/finalExamRegistration.repository"


const repository = new FinalExamRegistrationRepository()

export class FinalExamRegistrationService {

    public static async get() : Promise<FinalExamRegistration[]> {
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de registros de examenes finales: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<FinalExamRegistrationWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener el registro del examen final solicitado: ${error}`)
        }
    }

    public static async create(finalExamRegistration : Prisma.FinalExamRegistrationCreateInput) : Promise<FinalExamRegistration> {
        try {
            const result = await repository.create(finalExamRegistration)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear un nuevo registro del examen final: ${error}`)
        }
    }

    public static async update(id : number, finalExamRegistration : Prisma.FinalExamRegistrationCreateInput) : Promise<FinalExamRegistration>  {
        try {
            const finalExamRegistrationExists = await repository.getById(id)

            if (finalExamRegistrationExists === null) {
                throw new Error("El registro del examen final que desea actualizar no existe")    
            }

            const result = await repository.update(id, finalExamRegistration)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar el registro del examen final solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<FinalExamRegistration> {
        try {
            const finalExamExists = await repository.getById(id)

            if (finalExamExists === null) {
                throw new Error("El registro del examen final que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar el registro del examen final solicitada: ${error}`)
        }

    }

}