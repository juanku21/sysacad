
import { Prisma, FinalExamRegistration} from "@prisma/client"
import { FinalExamRegistrationWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class FinalExamRegistrationRepository extends BaseRepository 
<typeof prisma.finalExamRegistration, FinalExamRegistration, Prisma.FinalExamRegistrationCreateInput, Prisma.FinalExamRegistrationUpdateInput> {

    constructor(){
        super(prisma.finalExamRegistration)
    }

    public async getById(id : number) : Promise<FinalExamRegistrationWithRelations | null> {
        try {
            const result = await prisma.finalExamRegistration.findUnique({
                where: {
                    id: id
                },
                include: {
                    student: {
                        include: {
                            user: true
                        }
                    },
                    exam: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }

    public async getFiltered(params : IGetFilteredParams) : Promise<FinalExamRegistration[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize
            
            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.finalExamRegistration.findMany({
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