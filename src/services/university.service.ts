

import { Prisma, University } from "@prisma/client"
import { UniversityWithRelations } from "types"
import { UniversityRepository } from "../repositories/university.repository"


const repository = new UniversityRepository()

export class UniversityService {


    public static async get() : Promise<University[]> {

        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de universidades: ${error}`)
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