
import { Prisma, CourseRegistration} from "@prisma/client"
import { CourseRegistrationWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class CourseRegistrationRepository extends BaseRepository 
<typeof prisma.courseRegistration, CourseRegistration, Prisma.CourseRegistrationCreateInput, Prisma.CourseRegistrationUpdateInput> {

    constructor(){
        super(prisma.courseRegistration)
    }

    public async getById(id : number) : Promise<CourseRegistrationWithRelations | null> {
        try {
            const result = await prisma.courseRegistration.findUnique({
                where: {
                    id: id
                },
                include: {
                    student: {
                        include: {
                            user: true
                        }
                    },
                    dictation: true
                }
            })

            return result

        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }   
    
}