
import { Prisma, FinalExam } from "@prisma/client"
import { FinalExamWithRelations, IGetFilteredParams } from "../types"
import { FinalExamRepository } from "../repositories/finalExam.repository"


const repository = new FinalExamRepository()

export class FinalExamService {

    public static async get(pageNumber : number = 1, pageSize : number = 100): Promise<FinalExam[]> {
        try {
            if (pageSize > 100) pageSize = 100

            const result = await repository.get(pageNumber, pageNumber)
            return result
        }
        catch (error: any) {
            throw new Error(`No fue posible obtener la lista de examenes finales: ${error}`)
        }
    }

    public static async getById(id: number): Promise<FinalExamWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        }
        catch (error: any) {
            throw new Error(`No fue posible obtener el examen final solicitado: ${error}`)
        }
    }

    public static async getFiltered(params: IGetFilteredParams): Promise<FinalExam[]> {

        try {

            if (params.pageSize > 100) params.pageSize = 100

            const result = await repository.getFiltered(params)
            return result

        }
        catch (error: any) {
            throw new Error(`No fue posible obtener el estudiante solicitado: ${error}`)
        }

    }

    public static async create(finalExam: Prisma.FinalExamCreateInput): Promise<FinalExam> {
        try {
            const result = await repository.create(finalExam)
            return result
        }
        catch (error: any) {
            throw new Error(`No fue posible crear un nuevo examen final: ${error}`)
        }
    }

    public static async update(id: number, finalExam: Prisma.FinalExamUpdateInput): Promise<FinalExam> {
        try {
            const finalExamExists = await repository.getById(id)

            if (finalExamExists === null) {
                throw new Error("El examen final que desea actualizar no existe")
            }

            const result = await repository.update(id, finalExam)
            return result

        }
        catch (error: any) {
            throw new Error(`No fue posible actualizar el examen final solicitada: ${error}`)
        }
    }

    public static async delete(id: number): Promise<FinalExam> {
        try {
            const finalExamExists = await repository.getById(id)

            if (finalExamExists === null) {
                throw new Error("El examen final que desea eliminar no existe")
            }

            const result = await repository.delete(id)
            return result
        }
        catch (error: any) {
            throw new Error(`No fue posible eliminar el examen final solicitada: ${error}`)
        }

    }

}