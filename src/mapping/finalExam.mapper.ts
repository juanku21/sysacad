
import { RegularCertificateInput, FinalExamWithRelations } from "../types"
import { FinalExamCreateInput, FinalExamUpdateInput } from "../validators/finalExam.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"
import { connect } from "http2"


export class FinalExamMapper {

    public static fromDTOtoEntityCreate = (data : FinalExamCreateInput) : Prisma.FinalExamCreateInput => {

        return {
            date: data.date,
            classroom: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.classroom_id)
                }
            },
            subjectInfo:{
                connect: {
                    id: IdEncrypter.decodeUUID(data.subject_info_id)
                }
            }
        }

    }


    public static fromDTOtoEntityUpdate = (data : FinalExamUpdateInput) : Prisma.FinalExamUpdateInput => {

        const result : Prisma.FinalExamUpdateInput = {
            date:data.date,
        }

        if (data.classroom_id && result.classroom) result.classroom = {connect: {id: IdEncrypter.decodeUUID(data.classroom_id)}} 
        if (data.subject_info_id) result.subjectInfo = {connect: {id: IdEncrypter.decodeUUID(data.subject_info_id)}} 
        
        return result  

    }

}

