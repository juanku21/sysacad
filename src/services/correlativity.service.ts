
import { Prisma, Correlativity } from "@prisma/client"
import { CorrelativityWithRelations } from "../types"
import { CorrelativityRepository } from "../repositories/correlativity.repository"

const repository = new CorrelativityRepository()

export class CorrelativityService {

    public static async get() : Promise<Correlativity[]> {
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de correlatividades: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<CorrelativityWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la correlatividad solicitada: ${error}`)
        }
    }

    public static async create(correlativity : Prisma.CorrelativityCreateInput) : Promise<Correlativity> {
        try {
            const result = await repository.create(correlativity)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva correlatividad: ${error}`)
        }
    }

    public static async update(id : number, correlativity : Prisma.CorrelativityUpdateInput) : Promise<Correlativity> {
        try {
            const correlativityExists = await repository.getById(id)

            if (correlativityExists === null) {
                throw new Error("La correlatividad que desea actualizar no existe")    
            }

            const result = await repository.update(id, correlativity)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la correlatividad solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<Correlativity>{
        try {
            const CorrelativityExists = await repository.getById(id)

            if (CorrelativityExists === null) {
                throw new Error("La correlatividad que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la correlatividad solicitada: ${error}`)
        }
    }

}