
import { Prisma, Authority} from "@prisma/client"
import { AuthorityWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class AuthorityRepository extends BaseRepository 
<typeof prisma.authority, Authority, Prisma.AuthorityCreateInput, Prisma.AuthorityUpdateInput> {

    constructor(){
        super(prisma.authority)
    }

    public async getById(id : number) : Promise<AuthorityWithRelations | null> {
        try {
            const result = await prisma.authority.findUnique({
                where: {
                    id: id
                },
                include: {
                    user: true,
                    finalExam: {
                        include: {
                            finalExam: true
                        }
                    },
                    dictation: {
                        include: {
                            dictation: true
                        }
                    },
                    position: {
                        include: {
                            position: true
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