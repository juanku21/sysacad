
import { Prisma, SubjectInfo} from "@prisma/client"
import { SubjectInfoWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class SubjectInfoRepository extends BaseRepository 
<typeof prisma.subjectInfo, SubjectInfo, Prisma.SubjectInfoCreateInput, Prisma.SubjectInfoUpdateInput> {

    constructor(){
        super(prisma.subjectInfo)
    }

    public async getById(id : number) : Promise<SubjectInfoWithRelations | null> {
        try {
            const result = await prisma.subjectInfo.findUnique({
                where: {
                    id: id
                },
                include: {
                    dictation: true,
                    finalExam: true,
                    subject: true,
                    studyPlan: {
                        include: {
                            career: true
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

    public async getFiltered(params : IGetFilteredParams) : Promise<SubjectInfo[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize
            
            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.subjectInfo.findMany({
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