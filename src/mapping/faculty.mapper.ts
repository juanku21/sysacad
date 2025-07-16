
import { FacultyCreateInput, FacultyUpdateInput } from "../validators/faculty.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"


export class FacultyMapper {

    public static fromDTOtoEntityCreate = (data : FacultyCreateInput) : Prisma.FacultyCreateInput => {

        return {
            name: data.name,
            code: data.code,
            email: data.email,
            description: data.description,
            phone: data.phone,
            street: data.street,
            number: data.number,
            web: data.web,

            city: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.cityId)
                }
            },

            university: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.university_id)
                }
            }
        }

    }


    public static fromDTOtoEntityUpdate = (data : FacultyUpdateInput) : Prisma.FacultyUpdateInput => {

        const result : Prisma.FacultyUpdateInput = {
            name: data.name,
            code: data.code,
            email: data.email,
            description: data.description,
            phone: data.phone,
            street: data.street,
            number: data.number,
            web: data.web,
        }

        if (data.cityId && result.city) result.city = {connect: {id: IdEncrypter.decodeUUID(data.cityId)}} 
        if (data.university_id) result.university = {connect: {id: IdEncrypter.decodeUUID(data.university_id)}} 

        return result  

    }

}

