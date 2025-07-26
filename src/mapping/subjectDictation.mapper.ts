
import { SubjectDictatiocCreateInput, SubjectDictationUpdateInput } from "../validators/subjectDictation.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"


export class SubjectDictationMapper {

    public static fromDTOtoEntityCreate = (data : SubjectDictatiocCreateInput) : Prisma.SubjectDictationCreateInput => {

        return {
            year: data.year,

            
            subjectInfo: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.subject_info_id)
                }
            },

            classroom: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.classroom_id)
                }
            }
        }

    }


    public static fromDTOtoEntityUpdate = (data : SubjectDictationUpdateInput) : Prisma.SubjectDictationUpdateInput => {

        const result : Prisma.SubjectDictationUpdateInput = {
            year: data.year
        }

        if (data.subject_info_id && result.subjectInfo) result.subjectInfo= {connect: {id: IdEncrypter.decodeUUID(data.subject_info_id)}} 
        if (data.classroom_id) result.classroom = {connect: {id: IdEncrypter.decodeUUID(data.classroom_id)}} 

        return result  

    }

}

