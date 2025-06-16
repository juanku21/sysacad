import { Prisma, Qualification} from "@prisma/client"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class QualificationRepository extends BaseRepository 
<typeof prisma.qualification, Qualification, Prisma.QualificationCreateInput, Prisma.QualificationUpdateInput> {

    constructor(){
        super(prisma.qualification)
    }

    public async getById(id : number) : Promise<Qualification | null> {
        try {
            const result = await prisma.qualification.findUnique({
                where: {
                    id: id
                },
                
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }   
    
}
