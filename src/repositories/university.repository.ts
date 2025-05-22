
import { Prisma, University} from "@prisma/client"
import { UniversityWithRelations } from "types"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class UniversityRepository extends BaseRepository 
<typeof prisma.university, University, Prisma.UniversityCreateInput, Prisma.UniversityUpdateInput> {

    constructor(){
        super(prisma.university)
    }

    public async getById(id : number) : Promise<UniversityWithRelations | null> {
        try {
            const result = await prisma.university.findUnique({
                where: {
                    id: id
                },
                include: {
                    faculty: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }   
    
}