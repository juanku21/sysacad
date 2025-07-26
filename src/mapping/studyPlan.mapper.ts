import { StudyPlanCreateInput, StudyPlanUpdateInput } from "../validators/studyPlan.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"


export class StudyPlanMapper {

    public static fromDTOtoEntityCreate = (data : StudyPlanCreateInput) : Prisma.StudyPlanCreateInput => {

        return {
            description: data.description,
            effective_from: data.effective_from,
            code: data.code,
            duration: data.duration,
            career: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.career_id)
                }
            }
        }

    }


    public static fromDTOtoEntityUpdate = (data : StudyPlanUpdateInput) : Prisma.StudyPlanUpdateInput => {

        const result : Prisma.StudyPlanUpdateInput = {
            description: data.description,
            effective_from: data.effective_from,
            code: data.code,
            duration: data.duration
        }

        if (data.career_id && result.career) result.career = {connect: {id: IdEncrypter.decodeUUID(data.career_id)}}
        

        return result  

    }

}
