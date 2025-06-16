
import { Prisma, EducationalOffer } from "@prisma/client"
import { EducationalOfferWithRelations } from "../types"
import { EducationalOfferRepository } from "../repositories/educationalOffer.reposiroty"


const repository = new EducationalOfferRepository()

export class EducationalOfferService {

    public static async get() : Promise<EducationalOffer[]> {
        try {
            const result = await repository.get()
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