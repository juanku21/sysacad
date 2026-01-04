
import { Prisma, University} from "@prisma/client"
import { UniversityWithRelations, IGetFilteredParams } from "types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class UniversityRepository extends BaseRepository 
<typeof prisma.university, University, Prisma.UniversityCreateInput, Prisma.UniversityUpdateInput> {

    constructor(){
        super(prisma.university)
    }

    public async getById(id : number) : Promise<UniversityWithRelations | null> {
        try {
            const result = await prisma.university.findUnique({
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

    public async getFiltered(params : IGetFilteredParams) : Promise<University[]> {
            try {
    
                const skipAmount = (params.pageNumber - 1) * params.pageSize
                
                const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}
    
                const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}
    
                const result = await prisma.university.findMany({
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