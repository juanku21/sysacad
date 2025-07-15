
import { Prisma, Faculty } from "@prisma/client"
import { FacultyWithRelations } from "../types"
import { FacultyRepository } from "../repositories/faculty.repository"


const repository = new FacultyRepository()

export class FacultyService {

    public static async get() : Promise<Faculty[]> {
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de facultades: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<FacultyWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la facultad solicitada: ${error}`)
        }
    }

    public static async create(faculty : Prisma.FacultyCreateInput) : Promise<Faculty> {
        try {
            const result = await repository.create(faculty)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva facultad: ${error}`)
        }
    }

    public static async update(id : number, faculty : Prisma.FacultyUpdateInput) : Promise<Faculty | null>  {
        try {
            const facultyExists = await repository.getById(id)

            if (facultyExists === null) {
                return null   
            }

            const result = await repository.update(id, faculty)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la facultad solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<Faculty | null> {
        try {
            const facultyExists = await repository.getById(id)

            if (facultyExists === null) {
                return null   
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la facultad solicitada: ${error}`)
        }

    }

}