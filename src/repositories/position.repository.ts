
import { Prisma, Position} from "@prisma/client"
import { PositionWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class PositionRepository extends BaseRepository 
<typeof prisma.position, Position, Prisma.PositionCreateInput, Prisma.PositionUpdateInput> {

    constructor(){
        super(prisma.position)
    }

    public async getById(id : number) : Promise<PositionWithRelations | null> {
        try {
            const result = await prisma.position.findUnique({
                where: {
                    id: id
                },
                include: {
                    authority: {
                        include: {
                            authority: true
                        }
                    },
                    category: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }   

    public async getFiltered(params : IGetFilteredParams) : Promise<Position[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize
            
            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.position.findMany({
                where: prismaFilter,
                skip: skipAmount,
                take: params.pageSize
            })

            return result

        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }     
    
}