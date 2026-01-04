
import { Prisma, SubjectInfo } from "@prisma/client"
import { SubjectInfoWithRelations, IGetFilteredParams } from "../types"
import { SubjectInfoRepository } from "../repositories/subjectinfo.repository"

const repository = new SubjectInfoRepository()

export class SubjectInfoService {

    public static async get(pageNumber : number = 1, pageSize : number = 100) : Promise<SubjectInfo[]>{
        try {
            if (pageSize > 100) pageSize = 100

            const result = await repository.get(pageNumber, pageSize)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de facultades: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<SubjectInfoWithRelations | null>{
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la informacion de la materia: ${error}`)
        }
    }

    public static async getFiltered(params: IGetFilteredParams) : Promise<SubjectInfo[]> {

        try {

            if (params.pageSize > 100) params.pageSize = 100

            const result = await repository.getFiltered(params)
            return result

        }
        catch (error : any) {
            throw new Error(`No fue posible obtener el estudiante solicitado: ${error}`)
        }

    }    

    public static async create(subjectInfo : Prisma.SubjectInfoCreateInput) : Promise<SubjectInfo>{
        try {
            const result = await repository.create(subjectInfo)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva informacion de materia: ${error}`)
        }
    }

    public static async update(id : number, subjectInfo : Prisma.SubjectInfoCreateInput) : Promise<SubjectInfo>{
        try {
            const subjectInfoExists = await repository.getById(id)

            if (subjectInfoExists === null) {
                throw new Error("La información de la materia que desea actualizar no existe")    
            }

            const result = await repository.update(id, subjectInfo)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la informacion de la materia: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<SubjectInfo>{
        try {
            const SubjectInfoExists = await repository.getById(id)

            if (SubjectInfoExists === null) {
                throw new Error("La informacion de la materia que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la informacion de la materia: ${error}`)
        }
    }

}