
import { Prisma, Subject } from "@prisma/client"
import { SubjectWithRelations } from "../types"
import { SubjectRepository } from "../repositories/subject.repository"


const repository = new SubjectRepository()

export class SubjectService {

    public static async get() : Promise<Subject[]> {
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de materias: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<SubjectWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la materia solicitada: ${error}`)
        }
    }

    public static async create(subject : Prisma.SubjectCreateInput) : Promise<Subject> {
        try {
            const result = await repository.create(subject)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva materia: ${error}`)
        }
    }

    public static async update(id : number, subject : Prisma.SubjectCreateInput) : Promise<Subject>  {
        try {
            const subjectExists = await repository.getById(id)

            if (subjectExists === null) {
                throw new Error("La facultad que desea actualizar no existe")    
            }

            const result = await repository.update(id, subject)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la materia solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<Subject> {
        try {
            const subjectExists = await repository.getById(id)

            if (subjectExists === null) {
                throw new Error("La materia que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la materia solicitada: ${error}`)
        }

    }

}
