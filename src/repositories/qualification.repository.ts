
import { Prisma, Qualification} from "@prisma/client"
import { IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
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
            throw new Error(`Error al leer la base de datos`)
        }
    }   

    public async getFiltered(params : IGetFilteredParams) : Promise<Qualification[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize
            
            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.qualification.findMany({
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
