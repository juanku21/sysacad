
import { CourseRegistrationCreateInput, CourseRegistrationUpdateInput } from "../validators/courseRegistration.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"



export class CourseRegistrationtMapper {

    public static fromDTOtoEntityCreate = (data : CourseRegistrationCreateInput) : Prisma.CourseRegistrationCreateInput => {

        return {
            state: data.state,
            student: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.student_id)
                }
            },
            dictation: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.dictation_id)
                }
            }
        }

    }


    public static fromDTOtoEntityUpdate = (data : CourseRegistrationUpdateInput) : Prisma.CourseRegistrationUpdateInput => {

        const result : Prisma.CourseRegistrationUpdateInput = {
            state: data.state,
        }

        if (data.student_id) result.student = {connect: {id: IdEncrypter.decodeUUID(data.student_id)}} 
        if (data.dictation_id) result.dictation = {connect: {id: IdEncrypter.decodeUUID(data.dictation_id)}} 

        return result  

    }

}

