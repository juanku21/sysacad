
import { Prisma, Correlativity} from "@prisma/client"
import { CorrelativityWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class CorrelativityRepository extends BaseRepository 
<typeof prisma.correlativity, Correlativity, Prisma.CorrelativityCreateInput, Prisma.CorrelativityUpdateInput> {

    constructor(){
        super(prisma.correlativity)
    }

    public async getById(id : number) : Promise<CorrelativityWithRelations | null> {
        try {
            const result = await prisma.correlativity.findUnique({
                where: {
                    id: id
                },
                include: {
                    studyPlan: {
                        include: {
                            career: true
                        }
                    },
                    correlativity: true,
                    subject: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }
    
    public async getFiltered(params : IGetFilteredParams) : Promise<Correlativity[]> {
            try {
    
                const skipAmount = (params.pageNumber - 1) * params.pageSize
                
                const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

                const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}
    
                const result = await prisma.correlativity.findMany({
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