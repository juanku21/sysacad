
import { Prisma, EducationalOffer} from "@prisma/client"
import { EducationalOfferWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
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
    
    public async getFiltered(params : IGetFilteredParams) : Promise<EducationalOffer[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize
            
            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.educationalOffer.findMany({
                where: prismaFilter,
                skip: skipAmount,
                take: params.pageSize,
                orderBy: prismaOrder
            })

            return result

        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    } 
}