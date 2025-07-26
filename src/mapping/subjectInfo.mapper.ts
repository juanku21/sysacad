
import { SubjectInfoCreateInput, SubjectInfoUpdateInput } from "../validators/subjectInfo.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"


export class SubjectInfoMapper {

    public static fromDTOtoEntityCreate = (data : SubjectInfoCreateInput) : Prisma.SubjectInfoCreateInput => {

        return {
            hours: data.hours,
            type: data.type,

            
            subject: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.subject_id)
                }
            },

            studyPlan: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.study_plan_id)
                }
            }
        }

    }


    public static fromDTOtoEntityUpdate = (data : SubjectInfoUpdateInput) : Prisma.SubjectInfoUpdateInput => {

        const result : Prisma.SubjectInfoUpdateInput = {
            hours: data.hours,
            type: data.type,
        }

        if (data.subject_id && result.subject) result.subject= {connect: {id: IdEncrypter.decodeUUID(data.subject_id)}} 
        if (data.study_plan_id) result.studyPlan = {connect: {id: IdEncrypter.decodeUUID(data.study_plan_id)}} 

        return result  

    }

}

