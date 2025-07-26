
import { AuthorityCreateInput, AuthorityUpdateInput } from "../validators/authority.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"


export class AuthorityMapper {

    public static fromDTOtoEntityCreate = (data : AuthorityCreateInput) : Prisma.AuthorityCreateInput => {

        return {
            tuition: data.tuition,
            recruitment: data.recruitment,
            user: {
                create: {
                    name: data.name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.password,
                    gender: data.gender,
                    cuil: data.cuil,
                    phone: data.phone,
                    facultyId: IdEncrypter.decodeUUID(data.facultyId)
                }
            }
        }

    }


    public static fromDTOtoEntityUpdate = (data : AuthorityUpdateInput) : Prisma.AuthorityUpdateInput => {

        const result : Prisma.AuthorityUpdateInput = {
            tuition: data.tuition,
            recruitment: data.recruitment,
            user: {
                update: {
                    name: data.name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.password,
                    cuil: data.cuil,
                    phone: data.phone,
                }
            }
        }

        if (data.facultyId && result.user?.update) result.user.update.facultyId = IdEncrypter.decodeUUID(data.facultyId) 

        return result  

    }

}

