import { Prisma, FinalExam} from "@prisma/client"
import { FinalExamWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class FinalExamRepository extends BaseRepository 
<typeof prisma.finalExam, FinalExam, Prisma.FinalExamCreateInput, Prisma.FinalExamUpdateInput> {

    constructor(){
        super(prisma.finalExam)
    }

    public async getById(id : number) : Promise<FinalExamWithRelations | null> {
        try {
            const result = await prisma.finalExam.findUnique({
                where: {
                    id: id
                },
                include: {
                    teacher: {
                        include: {
                            teacher: {
                                include: {
                                    user: true
                                }
                            }
                        }
                    },
                    registrations: true,
                    subjectInfo: {
                        include: {
                            subject: true
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