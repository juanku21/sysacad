
import { Prisma, City } from "@prisma/client"
import { CityWithRelations, IGetFilteredParams } from "../types"
import { CityRepository } from "../repositories/city.repository"

const repository = new CityRepository()

export class CityService {

    public static async get(pageNumber : number = 1, pageSize : number = 100) : Promise<City[]> {
        try {

            if (pageSize > 100) pageSize = 100

            const result = await repository.get(pageNumber, pageSize)
            return result
            
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de ciudades: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<CityWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la ciudad solicitada: ${error}`)
        }
    }

    
    public static async getFiltered(params : IGetFilteredParams) : Promise<City[]> {

        try {

            if (params.pageSize > 100) params.pageSize = 100

            const result = await repository.getFiltered(params)
            return result

        }
        catch (error : any) {
            throw new Error(`No fue posible obtener la ciudad solicitada: ${error}`)
        }

    }

    public static async create(city : Prisma.CityCreateInput) : Promise<City>{
        try {
            const result = await repository.create(city)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva ciudad: ${error}`)
        }
    }

    public static async update(id : number, city : Prisma.CityUpdateInput) : Promise<City | null> {
        try {
            const cityExists = await repository.getById(id)

            if (cityExists === null) {
                return null    
            }

            const result = await repository.update(id, city)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la ciudad solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<City | null>{
        try {
            const cityExists = await repository.getById(id)

            if (cityExists === null) {
                return null   
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la ciudad solicitada: ${error}`)
        }

    }

}