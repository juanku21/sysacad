
import { UniversityRepositorie } from "../repositories/university.repositorie"
import { Prisma, University } from "@prisma/client"
import { UniversityWithRelations } from "models/university.model"

export class UniversityService {


    public static async get() : Promise<University[]> {
        try {
            const result = await UniversityRepositorie.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de universidades: ${error}`)
        }
    }

    public static async findById(id : number) : Promise<UniversityWithRelations | null> {
        try {
            const result = await UniversityRepositorie.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la universidad solicitada: ${error}`)
        }
    }

    public static async create(university : Prisma.UniversityCreateInput) {

        try {
            const result = await UniversityRepositorie.create(university)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva universidad: ${error}`)
        }

    }

    public static async update(id : number, university : Prisma.UniversityUpdateInput) : Promise<University> {

        try {
            const universityExists = await UniversityRepositorie.getById(id)

            if (universityExists === null) {
                throw new Error("El usuario que desea actualizar no existe")    
            }

            const result = await UniversityRepositorie.update(id, university)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la universidad solicitada: ${error}`)
        }

    }

    public static async delete(id: number) : Promise<University> {

        try {
            const universityExists = await UniversityRepositorie.getById(id)

            if (universityExists === null) {
                throw new Error("El usuario que desea eliminar no existe")    
            }

            const result = await UniversityRepositorie.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la universidad solicitada: ${error}`)
        }

    }

}