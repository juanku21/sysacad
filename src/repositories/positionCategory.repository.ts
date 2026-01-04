
import { Prisma, PositionCategory} from "@prisma/client"
import { PositionCategoryWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class PositionCategoryRepository extends BaseRepository 
<typeof prisma.positionCategory, PositionCategory, Prisma.PositionCategoryCreateInput, Prisma.PositionCategoryUpdateInput> {

    constructor(){
        super(prisma.positionCategory)
    }

    public async getById(id : number) : Promise<PositionCategoryWithRelations | null> {
        try {
            const result = await prisma.positionCategory.findUnique({
                where: {
                    id: id
                },
                include: {
                    positions: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }

    public async getFiltered(params : IGetFilteredParams) : Promise<PositionCategory[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize
            
            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.positionCategory.findMany({
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
