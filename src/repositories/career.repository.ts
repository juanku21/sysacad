
import { Prisma, Career } from "@prisma/client"
import { CareerWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
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
            throw new Error(`Error al leer la base de datos`)
        }
    }

    public async getFiltered(params: IGetFilteredParams) : Promise<Career[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize;
            
            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {};

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.career.findMany({
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