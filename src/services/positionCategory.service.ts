
import { Prisma, PositionCategory } from "@prisma/client"
import { PositionCategoryWithRelations } from "../types"
import { PositionCategoryRepository } from "../repositories/positionCategory.repository"


const repository = new PositionCategoryRepository()

export class PositionCategoryService {

    public static async get() : Promise<PositionCategory[]> {
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de categorias de cargos: ${error}`)
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