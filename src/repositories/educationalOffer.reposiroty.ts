
import { Prisma, EducationalOffer} from "@prisma/client"
import { EducationalOfferWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import prisma from "../config/client"

export class EducationalOfferRepository extends BaseRepository 
<typeof prisma.educationalOffer, EducationalOffer, Prisma.EducationalOfferCreateInput, Prisma.EducationalOfferUpdateInput> {

    constructor(){
        super(prisma.educationalOffer)
    }

    public async getById(id : number) : Promise<EducationalOfferWithRelations | null> {
        try {
            const result = await prisma.educationalOffer.findUnique({
                where: {
                    id: id
                },
                include: {
                    career: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }   
    
    public async getFiltered(filter : string, pageNumber : number = 1, pageSize : number = 100) : Promise<EducationalOffer[]> {
        try {

            const skipAmount = (pageNumber - 1) * pageSize
            
            const prismaFilter = filter ? PrismaFilterTransformer.toPrismaWhere(filter) : {}

            const result = await prisma.educationalOffer.findMany({
                where: prismaFilter,
                skip: skipAmount,
                take: pageSize
            })

            return result

        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    } 
}