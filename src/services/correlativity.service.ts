
import { Prisma, Correlativity } from "@prisma/client"
import { CorrelativityWithRelations, IGetFilteredParams } from "../types"
import { CorrelativityRepository } from "../repositories/correlativity.repository"

export const repository = new CorrelativityRepository()

export class CorrelativityService {

    public static async get(pageNumber : number = 1, pageSize : number = 100) : Promise<Correlativity[]> {
        try {
            if (pageSize > 100) pageSize = 100
            
            const result = await repository.get(pageNumber, pageSize)
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

        public static async getFiltered(params: IGetFilteredParams) : Promise<Correlativity[]> {
    
            try {
    
                if (params.pageSize > 100) params.pageSize = 100
    
                const result = await repository.getFiltered(params)
                return result
    
            }
            catch (error : any) {
                throw new Error(`No fue posible obtener el estudiante solicitado: ${error}`)
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