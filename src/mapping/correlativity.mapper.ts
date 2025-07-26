import { CorrelativityCreateInput, CorrelativityUpdateInput } from "../validators/correlativity.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"


export class CorrelativityMapper {

    public static fromDTOtoEntityCreate = (data : CorrelativityCreateInput) : Prisma.CorrelativityCreateInput => {

        return {
            course: data.course,
            aprrove: data.aprrove,
            type: data.type,
            subject: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.subject_id)
                }
            },
            correlativity: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.correlativitie_id)
                }
            },
            studyPlan: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.study_plan_id)
                }
            }
        }

    }


    public static fromDTOtoEntityUpdate = (data : CorrelativityUpdateInput) : Prisma.CorrelativityUpdateInput => {

        const result : Prisma.CorrelativityUpdateInput = {
            course: data.course,
            aprrove: data.aprrove,
            type: data.type
        }

        if (data.subject_id && result.subject) result.subject = {connect: {id: IdEncrypter.decodeUUID(data.subject_id)}}
        if (data.correlativitie_id && result.correlativity) result.correlativity = {connect: {id: IdEncrypter.decodeUUID(data.correlativitie_id)}}
        if (data.study_plan_id && result.studyPlan) result.studyPlan = {connect: {id: IdEncrypter.decodeUUID(data.study_plan_id)}}

        return result  

    }

}