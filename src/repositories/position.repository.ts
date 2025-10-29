import { Prisma, Position} from "@prisma/client"
import { PositionWithRelations} from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/filterAdapter"
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

    public async getFiltered(filter : string, pageNumber : number = 1, pageSize : number = 100) : Promise<Position[]> {
        try {

            const skipAmount = (pageNumber - 1) * pageSize
            
            const prismaFilter = filter ? PrismaFilterTransformer.toPrismaWhere(filter) : {}

            console.log(prismaFilter)

            const result = await prisma.position.findMany({
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