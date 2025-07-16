
import { RegularCertificateInput, StudentWithRelations } from "../types"
import { StudentCreateInput, StudentUpdateInput } from "../validators/student.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"


export class StudentMapper {

    public static fromEntityToCertificateObject = (data : StudentWithRelations) : RegularCertificateInput => {

        return {
            name: data.user.name,
            last_name: data.user.last_name,
            cuil: data.user.cuil,
            file: data.file,
            career: data.career.name,
            faculty: data.user.faculty.name,
            university: data.user.faculty.university.name,
            city: data.user.faculty.city.name,
            date: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
        }

    }


    public static fromDTOtoEntityCreate = (data : StudentCreateInput) : Prisma.StudentCreateInput => {

        return {
            file: data.file,
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
            },
            career: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.career_id)
                }
            }
        }

    }


    public static fromDTOtoEntityUpdate = (data : StudentUpdateInput) : Prisma.StudentUpdateInput => {

        const result : Prisma.StudentUpdateInput = {
            file: data.file,
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
        if (data.career_id) result.career = {connect: {id: IdEncrypter.decodeUUID(data.career_id)}} 

        return result  

    }

}

