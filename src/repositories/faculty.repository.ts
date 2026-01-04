
import { Prisma, Faculty} from "@prisma/client"
import { FacultyWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class FacultyRepository extends BaseRepository 
<typeof prisma.faculty, Faculty, Prisma.FacultyCreateInput, Prisma.FacultyUpdateInput> {

    constructor(){
        super(prisma.faculty)
    }

    public async getById(id : number) : Promise<FacultyWithRelations | null> {
        try {
            const result = await prisma.faculty.findUnique({
                where: {
                    id: id
                },
                include: {
                    educationalOffers: true,
                    university: true,
                    city: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }

    public async getFiltered(params : IGetFilteredParams) : Promise<Faculty[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize
            
            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.faculty.findMany({
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
