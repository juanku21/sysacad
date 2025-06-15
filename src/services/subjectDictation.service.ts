
import { Prisma, SubjectDictation } from "@prisma/client"
import { SubjectDictationWithRelations } from "../types"
import { SubjectDictationRepository } from "../repositories/subjectDictation.repository"


const repository = new SubjectDictationRepository()

export class SubjectDictationService {

    public static async get() : Promise<SubjectDictation[]>{
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de dictado de materia: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<SubjectDictationWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener el dictado de materia solicitado: ${error}`)
        }
    }

    public static async create(subjectDictation : Prisma.SubjectDictationCreateInput) : Promise<SubjectDictation> {
        try {
            const result = await repository.create(subjectDictation)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear un nuevo dictado de materia: ${error}`)
        }
    }

    public static async update(id : number, subjectDictation : Prisma.SubjectDictationCreateInput) : Promise<SubjectDictation>  {
        try {
            const subjectDictationExists = await repository.getById(id)

            if (subjectDictationExists === null) {
                throw new Error("El dictado de materia que desea actualizar no existe")    
            }

            const result = await repository.update(id, subjectDictation)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar el dictado de materia solicitado: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<SubjectDictation> {
        try {
            const subjectDictationExists = await repository.getById(id)

            if (subjectDictationExists === null) {
                throw new Error("El dictado de materia que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar el dictado de materia solicitada: ${error}`)
        }

    }

}