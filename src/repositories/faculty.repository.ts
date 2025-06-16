import { Prisma, Faculty} from "@prisma/client"
import { FacultyWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class FacultyRepository extends BaseRepository 
<typeof prisma.faculty, Faculty, Prisma.FacultyCreateInput, Prisma.FacultyUpdateInput> {

    constructor(){
        super(prisma.faculty)
    }

    public async getById(id : number) : Promise<FacultyWithRelations | null> {
        try {
            const result = await prisma.faculty.findUnique({
                where: {
                    id: id
                },
                include: {
                    educationalOffers: true,
                    university: true,
                    city: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }   
    
}
