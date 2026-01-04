
import { Prisma, CourseRegistration} from "@prisma/client"
import { CourseRegistrationWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class CourseRegistrationRepository extends BaseRepository 
<typeof prisma.courseRegistration, CourseRegistration, Prisma.CourseRegistrationCreateInput, Prisma.CourseRegistrationUpdateInput> {

    constructor(){
        super(prisma.courseRegistration)
    }

    public async getById(id : number) : Promise<CourseRegistrationWithRelations | null> {
        try {
            const result = await prisma.courseRegistration.findUnique({
                where: {
                    id: id
                },
                include: {
                    student: {
                        include: {
                            user: true
                        }
                    },
                    dictation: true
                }
            })

            return result

        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }   
    
    public async getFiltered(params : IGetFilteredParams) : Promise<CourseRegistration[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize
            
            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.courseRegistration.findMany({
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