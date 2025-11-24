
import { Prisma, PositionCategory} from "@prisma/client"
import { PositionCategoryWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
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

    public async getFiltered(filter : string, pageNumber : number = 1, pageSize : number = 100) : Promise<PositionCategory[]> {
        try {

            const skipAmount = (pageNumber - 1) * pageSize
            
            const prismaFilter = filter ? PrismaFilterTransformer.toPrismaWhere(filter) : {}

            console.log(prismaFilter)

            const result = await prisma.positionCategory.findMany({
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
