import { Prisma, Career} from "@prisma/client"
import { CareerWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class CareerRepository extends BaseRepository 
<typeof prisma.career, Career, Prisma.CareerCreateInput, Prisma.CareerUpdateInput> {

    constructor(){
        super(prisma.career)
    }

    public async getById(id : number) : Promise<CareerWithRelations | null> {
        try {
            const result = await prisma.career.findUnique({
                where: {
                    id: id
                },
                include: {
                    educationalOffers: true,
                    studyPlans: true,
                    students: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }   
    
}