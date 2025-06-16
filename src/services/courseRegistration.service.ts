
import { Prisma, CourseRegistration } from "@prisma/client"
import { CourseRegistrationWithRelations } from "../types"
import { CourseRegistrationRepository } from "../repositories/courseRegistration.repository"


const repository = new CourseRegistrationRepository()

export class CourseRegistrationService {

    public static async get() : Promise<CourseRegistration[]> {
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de registracion de curso: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<CourseRegistrationWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la registracion de curso solicitada: ${error}`)
        }
    }

    public static async create(courseRegistration : Prisma.CourseRegistrationCreateInput) : Promise<CourseRegistration> {
        try {
            const result = await repository.create(courseRegistration)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva registracion de curso: ${error}`)
        }
    }

    public static async update(id : number, courseRegistration : Prisma.CourseRegistrationCreateInput) : Promise<CourseRegistration>  {
        try {
            const courseRegistrationExists = await repository.getById(id)

            if (courseRegistrationExists === null) {
                throw new Error("La registracion de curso que desea actualizar no existe")    
            }

            const result = await repository.update(id, courseRegistration)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la registracion de curso solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<CourseRegistration> {
        try {
            const courseRegistrationExists = await repository.getById(id)

            if (courseRegistrationExists === null) {
                throw new Error("La registracion de curso que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la registracion de curso solicitada: ${error}`)
        }

    }

}