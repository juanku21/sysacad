
import { Prisma, Qualification } from "@prisma/client"
import { QualificationRepository } from "../repositories/qualification.repository"


const repository = new QualificationRepository()

export class QualificationService {

    public static async get(pageNumber : number = 1, pageSize : number = 100) : Promise<Qualification[]> {
        try {
            if (pageSize > 100) pageSize = 100

            const result = await repository.get(pageNumber, pageSize)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de facultades: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<Qualification | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la calificación solicitada: ${error}`)
        }
    }

    public static async getFiltered(filter : string, pageNumber : number = 1, pageSize : number = 100) : Promise<Qualification[]> {

        try {

            if (pageSize > 100) pageSize = 100

            const result = await repository.getFiltered(filter, pageNumber, pageSize)
            return result

        }
        catch (error : any) {
            throw new Error(`No fue posible obtener el estudiante solicitado: ${error}`)
        }

    }

    public static async create(qualification : Prisma.QualificationCreateInput) : Promise<Qualification> {
        try {
            const result = await repository.create(qualification)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva calificación: ${error}`)
        }
    }

    public static async update(id : number, qualification : Prisma.QualificationUpdateInput) : Promise<Qualification>  {
        try {
            const qualificationExists = await repository.getById(id)

            if (qualificationExists === null) {
                throw new Error("La calificación que desea actualizar no existe")    
            }

            const result = await repository.update(id, qualification)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la calificación solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<Qualification> {
        try {
            const qualificationExists = await repository.getById(id)

            if (qualificationExists === null) {
                throw new Error("La calificación que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la calificación solicitada: ${error}`)
        }

    }

}