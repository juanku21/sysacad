
import { Prisma, SubjectDictation} from "@prisma/client"
import { SubjectDictationWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class SubjectDictationRepository extends BaseRepository 
<typeof prisma.subjectDictation, SubjectDictation, Prisma.SubjectDictationCreateInput, Prisma.SubjectDictationUpdateInput> {

    constructor(){
        super(prisma.subjectDictation)
    }

    public async getById(id : number) : Promise<SubjectDictationWithRelations | null> {
        try {
            const result = await prisma.subjectDictation.findUnique({
                where: {
                    id: id
                },
                include: {
        registrations: true,
        teacher: {
            include: {
                teacher: {
                    include: {
                        user: true
                    }
                }
            }
        },
        subjectInfo: true
    }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }   
    
}