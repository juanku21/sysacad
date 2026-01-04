
import { Prisma, EducationalOffer } from "@prisma/client"
import { EducationalOfferWithRelations, IGetFilteredParams } from "../types"
import { EducationalOfferRepository } from "../repositories/educationalOffer.reposiroty"


const repository = new EducationalOfferRepository()

export class EducationalOfferService {

    public static async get(pageNumber : number = 1, pageSize : number = 100) : Promise<EducationalOffer[]> {
        try {
            if (pageSize > 100) pageSize = 100

            const result = await repository.get(pageNumber, pageSize)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de oferta educativa: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<EducationalOfferWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la oferta educativo solicitada: ${error}`)
        }
    }

    public static async getFiltered(params: IGetFilteredParams) : Promise<EducationalOffer[]> {
    
        try {

            if (params.pageSize > 100) params.pageSize = 100

            const result = await repository.getFiltered(params)
            return result

        }
        catch (error : any) {
            throw new Error(`No fue posible obtener el estudiante solicitado: ${error}`)
        }

    }

    public static async create(educationalOffer : Prisma.EducationalOfferCreateInput) : Promise<EducationalOffer> {
        try {
            const result = await repository.create(educationalOffer)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva oferta educativa: ${error}`)
        }
    }

    public static async update(id : number, educationalOffer : Prisma.EducationalOfferCreateInput) : Promise<EducationalOffer>  {
        try {
            const educationalOfferExists = await repository.getById(id)

            if (educationalOfferExists === null) {
                throw new Error("La oferta educativa que desea actualizar no existe")    
            }

            const result = await repository.update(id, educationalOffer)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la oferta educativa solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<EducationalOffer> {
        try {
            const educationalOfferExists = await repository.getById(id)

            if (educationalOfferExists === null) {
                throw new Error("La oferta educativa que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la oferta educativa solicitada: ${error}`)
        }

    }

}