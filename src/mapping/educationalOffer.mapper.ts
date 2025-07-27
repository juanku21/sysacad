
import { EducationalOfferCreateInput, EducationalOfferUpdateInput } from "../validators/educationalOffer.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"


export class EducationalOfferMapper {

    public static fromDTOtoEntityCreate = (data : EducationalOfferCreateInput) : Prisma.EducationalOfferCreateInput => {

        return {
            year: data.year,
            price: data.price, 

            
            faculty: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.faculty_id)
                }
            },

            career: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.career_id)
                }
            }
        }

    }


    public static fromDTOtoEntityUpdate = (data : EducationalOfferUpdateInput) : Prisma.EducationalOfferUpdateInput => {

        const result : Prisma.EducationalOfferUpdateInput = {
            year: data.year,
            price: data.price
        }

        if (data.faculty_id && result.faculty) result.faculty= {connect: {id: IdEncrypter.decodeUUID(data.faculty_id)}} 
        if (data.career_id) result.career = {connect: {id: IdEncrypter.decodeUUID(data.career_id)}} 

        return result  

    }

}