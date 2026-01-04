
import { Prisma, PositionCategory } from "@prisma/client"
import { PositionCategoryWithRelations, IGetFilteredParams } from "../types"
import { PositionCategoryRepository } from "../repositories/positionCategory.repository"


const repository = new PositionCategoryRepository()

export class PositionCategoryService {

    public static async get(pageNumber : number = 1, pageSize : number = 100) : Promise<PositionCategory[]> {
        try {
            if (pageSize > 100) pageSize = 100

            const result = await repository.get(pageNumber, pageSize)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de facultades: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<PositionCategoryWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la categoria de cargo solicitada: ${error}`)
        }
    }

    public static async getFiltered(params: IGetFilteredParams) : Promise<PositionCategory[]> {

        try {

            if (params.pageSize > 100) params.pageSize = 100

            const result = await repository.getFiltered(params)
            return result

        }
        catch (error : any) {
            throw new Error(`No fue posible obtener el estudiante solicitado: ${error}`)
        }

    }

    public static async create(positionCategory : Prisma.PositionCategoryCreateInput) : Promise<PositionCategory> {
        try {
            const result = await repository.create(positionCategory)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva categoria de cargo: ${error}`)
        }
    }

    public static async update(id : number, positionCategory : Prisma.PositionCategoryCreateInput) : Promise<PositionCategory>  {
        try {
            const positionCategoryExists = await repository.getById(id)

            if (positionCategoryExists === null) {
                throw new Error("La categoria de cargo que desea actualizar no existe")    
            }

            const result = await repository.update(id, positionCategory)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la categoria de cargo solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<PositionCategory> {
        try {
            const positionCategoryExists = await repository.getById(id)

            if (positionCategoryExists === null) {
                throw new Error("La categoria de cargo que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la categoria de cargo solicitada: ${error}`)
        }

    }

}