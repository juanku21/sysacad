import { Prisma, Career } from "@prisma/client"
import { CareerWithRelations } from "../types"
import { CareerRepository } from "../repositories/career.repository"


const repository = new CareerRepository()

export class CareerService {

    public static async get() : Promise<Career[]> {
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de las carreras: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<CareerWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la carrera solicitada: ${error}`)
        }
    }

    public static async create(career : Prisma.CareerCreateInput) : Promise<Career> {
        try {
            const result = await repository.create(career)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva carrera: ${error}`)
        }
    }

    public static async update(id : number, career : Prisma.CareerCreateInput) : Promise<Career>  {
        try {
            const careerExists = await repository.getById(id)

            if (careerExists === null) {
                throw new Error("La carrera que desea actualizar no existe")    
            }

            const result = await repository.update(id, career)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la carrera solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<Career> {
        try {
            const finalExamExists = await repository.getById(id)

            if (finalExamExists === null) {
                throw new Error("La carrera que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la carrera solicitada: ${error}`)
        }

    }

}