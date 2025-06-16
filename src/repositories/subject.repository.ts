
import { Prisma, Subject} from "@prisma/client"
import { SubjectWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class SubjectRepository extends BaseRepository 
<typeof prisma.subject, Subject, Prisma.SubjectCreateInput, Prisma.SubjectUpdateInput> {

    constructor(){
        super(prisma.subject)
    }

    public async getById(id : number) : Promise<SubjectWithRelations | null> {
        try {
            const result = await prisma.subject.findUnique({
                where: {
                    id: id
                },
                include: {
                    correlativities: {
                        include: {
                            studyPlan: {
                                include: {
                                    career: true
                                }
                            }
                        }
                    },
                    required: {
                        include: {
                            studyPlan: {
                                include: {
                                    career: true
                                }
                            }
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
