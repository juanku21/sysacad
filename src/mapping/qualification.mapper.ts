import { QualificationCreateInput, QualificationUpdateInput } from "../validators/qualification.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"


export class QualificationMapper {

    public static fromDTOtoEntityCreate = (data : QualificationCreateInput) : Prisma.QualificationCreateInput => {

        return {
            value: data.value,
            student: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.student_id)
                }
            },
            subject: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.subject_id)
                }
            }
        }

    }


    public static fromDTOtoEntityUpdate = (data : QualificationUpdateInput) : Prisma.QualificationUpdateInput => {

        const result : Prisma.QualificationUpdateInput = {
            value: data.value
        }

        if (data.student_id && result.student) result.student = {connect: {id: IdEncrypter.decodeUUID(data.student_id)}}
        if (data.subject_id && result.subject) result.subject = {connect: {id: IdEncrypter.decodeUUID(data.subject_id)}}

        return result  

    }

}