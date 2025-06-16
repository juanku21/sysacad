import { Prisma, FinalExamRegistration} from "@prisma/client"
import { FinalExamRegistrationWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class FinalExamRegistrationRepository extends BaseRepository 
<typeof prisma.finalExamRegistration, FinalExamRegistration, Prisma.FinalExamRegistrationCreateInput, Prisma.FinalExamRegistrationUpdateInput> {

    constructor(){
        super(prisma.finalExamRegistration)
    }

    public async getById(id : number) : Promise<FinalExamRegistrationWithRelations | null> {
        try {
            const result = await prisma.finalExamRegistration.findUnique({
                where: {
                    id: id
                },
                include: {
                    student: {
                        include: {
                            user: true
                        }
                    },
                    exam: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }   
    
}