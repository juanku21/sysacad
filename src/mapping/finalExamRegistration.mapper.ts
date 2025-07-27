
import { FinalExamRegistrationCreateInput, FinalExamRegistrationUpdateInput } from "../validators/finalExamRegistration.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"


export class FinalExamRegistrationMapper {

    public static fromDTOtoEntityCreate = (data : FinalExamRegistrationCreateInput) : Prisma.FinalExamRegistrationCreateInput => {

        return {
            qualification: data.qualification,
            state: data.state, 

            
            student: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.student_id)
                }
            },

            exam: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.final_exam_id)
                }
            }
        }

    }


    public static fromDTOtoEntityUpdate = (data : FinalExamRegistrationUpdateInput) : Prisma.FinalExamRegistrationUpdateInput => {

        const result : Prisma.FinalExamRegistrationUpdateInput = {
            qualification: data.qualification,
            state: data.state
        }

        if (data.student_id && result.student) result.student= {connect: {id: IdEncrypter.decodeUUID(data.student_id)}} 
        if (data.final_exam_id) result.exam = {connect: {id: IdEncrypter.decodeUUID(data.final_exam_id)}} 

        return result  

    }

}