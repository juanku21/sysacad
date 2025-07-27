
import { Prisma, ClassRoom } from "@prisma/client"
import { ClassRoomWithRelations } from "../types"
import { ClassRoomRepository } from "../repositories/classRoom.repository"


const repository = new ClassRoomRepository()

export class ClassRoomService {

    public static async get() : Promise<ClassRoom[]> {
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de aulas: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<ClassRoomWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener el aula solicitada: ${error}`)
        }
    }

    public static async create(classRoom : Prisma.ClassRoomCreateInput) : Promise<ClassRoom> {
        try {
            const result = await repository.create(classRoom)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva aula: ${error}`)
        }
    }

    public static async update(id : number, classRoom : Prisma.ClassRoomUpdateInput) : Promise<ClassRoom>  {
        try {
            const classRoomExists = await repository.getById(id)

            if (classRoomExists === null) {
                throw new Error("El aula que desea actualizar no existe")    
            }

            const result = await repository.update(id, classRoom)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar el aula solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<ClassRoom> {
        try {
            const classRoomExists = await repository.getById(id)

            if (classRoomExists === null) {
                throw new Error("El aula que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar el aula solicitada: ${error}`)
        }

    }

}