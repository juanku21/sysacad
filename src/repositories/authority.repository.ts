
import { Prisma, Authority} from "@prisma/client"
import { AuthorityWithRelations , IGetFilteredParams} from "../types"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class AuthorityRepository extends BaseRepository 
<typeof prisma.authority, Authority, Prisma.AuthorityCreateInput, Prisma.AuthorityUpdateInput> {

    constructor(){
        super(prisma.authority)
    }

    public async getById(id : number) : Promise<AuthorityWithRelations | null> {
        try {
            const result = await prisma.authority.findUnique({
                where: {
                    id: id
                },
                include: {
                    user: true,
                    finalExam: {
                        include: {
                            finalExam: true
                        }
                    },
                    dictation: {
                        include: {
                            dictation: true
                        }
                    },
                    position: {
                        include: {
                            position: true
                        }
                    }
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }
    
    public async getFiltered(params : IGetFilteredParams) : Promise<Authority[]> {
        try {

            const skipAmount : number = params.pageNumber * params.pageSize

            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.authority.findMany({
                where: prismaFilter,
                skip: skipAmount,
                take: params.pageSize,
            }) 

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    } 
    
}