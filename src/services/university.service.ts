

import { Prisma, University } from "@prisma/client"
import { UniversityWithRelations } from "types"
import { UniversityRepository } from "../repositories/university.repository"


const repository = new UniversityRepository()

export class UniversityService {


    public static async get(pageNumber : number = 1, pageSize : number = 100) : Promise<University[]> {
        try {
            if (pageSize > 100) pageSize = 100
    
            const result = await repository.get(pageNumber, pageSize)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de facultades: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<UniversityWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la universidad solicitada: ${error}`)
        }
    }

    public static async getFiltered(filter : string, pageNumber : number = 1, pageSize : number = 100) : Promise<University[]> {
    
            try {
    
                if (pageSize > 100) pageSize = 100
    
                const result = await repository.getFiltered(filter, pageNumber, pageSize)
                return result
    
            }
            catch (error : any) {
                throw new Error(`No fue posible obtener el estudiante solicitado: ${error}`)
            }
    
        }

    public static async create(university : Prisma.UniversityCreateInput) : Promise<University> {

        try {
            const result = await repository.create(university)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva universidad: ${error}`)
        }

    }

    public static async update(id : number, university : Prisma.UniversityUpdateInput) : Promise<University | null> {

        try {
            const universityExists = await repository.getById(id)

            if (universityExists === null) {
                return null   
            }

            const result = await repository.update(id, university)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la universidad solicitada: ${error}`)
        }

    }

    public static async delete(id: number) : Promise<University | null> {

        try {
            const universityExists = await repository.getById(id)

            if (universityExists === null) {
                return null   
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la universidad solicitada: ${error}`)
        }

    }

}