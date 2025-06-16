import { Prisma, StudyPlan} from "@prisma/client"
import { StudyPlanWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class StudyPlanRepository extends BaseRepository 
<typeof prisma.studyPlan, StudyPlan, Prisma.StudyPlanCreateInput, Prisma.StudyPlanUpdateInput> {

    constructor(){
        super(prisma.studyPlan)
    }

    public async getById(id : number) : Promise<StudyPlanWithRelations | null> {
        try {
            const result = await prisma.studyPlan.findUnique({
                where: {
                    id: id
                },
                include: {
                    subjectInfo: {
                        include: {
                            subject: true
                        }
                    },
                    correlativities: true,
                    career: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }   
    
}