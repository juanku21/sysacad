
import { Prisma, City } from "@prisma/client"
import { CityWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class CityRepository extends BaseRepository 
<typeof prisma.city, City, Prisma.CityCreateInput, Prisma.CityUpdateInput> {

    constructor(){
        super(prisma.city)
    }

    public async getById(id : number) : Promise<CityWithRelations | null> {
        try {
            const result = await prisma.city.findUnique({
                where: {
                    id: id
                },
                include: {
                    faculty: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }   
    
    public async getFiltered(params : IGetFilteredParams) : Promise<City[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize
            
            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.city.findMany({
                where: prismaFilter,
                skip: skipAmount,
                take: params.pageSize,
                orderBy: prismaOrder
            })

            return result

        } 
        catch (error : any) {
            console.log(error)
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    } 
}