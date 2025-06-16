
import { Prisma, Position } from "@prisma/client"
import { PositionWithRelations } from "../types"
import { PositionRepository } from "../repositories/position.repository"

const repository = new PositionRepository()

export class PositionService {

    public static async get() : Promise<Position[]>{
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de cargos: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<PositionWithRelations | null>{
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener el cargo solicitado: ${error}`)
        }
    }

    public static async create(position : Prisma.PositionCreateInput) : Promise<Position> {
        try {
            const result = await repository.create(position)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear un nuevo cargo: ${error}`)
        }
    }

    public static async update(id : number, position : Prisma.PositionCreateInput) : Promise<Position>{
        try {
            const positionExists = await repository.getById(id)

            if (positionExists === null) {
                throw new Error("El cargo que desea actualizar no existe")    
            }

            const result = await repository.update(id, position)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar el cargo solicitado: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<Position> {
        try {
            const positionExists = await repository.getById(id)

            if (positionExists === null) {
                throw new Error("El cargo que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar el cargo solicitado: ${error}`)
        }
    }

}