import { Prisma, SubjectInfo} from "@prisma/client"
import { SubjectInfoWithRelations} from "../types"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class SubjectInfoRepository extends BaseRepository 
<typeof prisma.subjectInfo, SubjectInfo, Prisma.SubjectInfoCreateInput, Prisma.SubjectInfoUpdateInput> {

    constructor(){
        super(prisma.subjectInfo)
    }

    public async getById(id : number) : Promise<SubjectInfoWithRelations | null> {
        try {
            const result = await prisma.subjectInfo.findUnique({
                where: {
                    id: id
                },
                include: {
                    dictation: true,
                    finalExam: true,
                    subject: true,
                    studyPlan: {
                        include: {
                            career: true
                        }
                    }
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }   
    
}