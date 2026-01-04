
import { Prisma, StudyPlan } from "@prisma/client"
import { StudyPlanWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class StudyPlanRepository extends BaseRepository
    <typeof prisma.studyPlan, StudyPlan, Prisma.StudyPlanCreateInput, Prisma.StudyPlanUpdateInput> {

    constructor() {
        super(prisma.studyPlan)
    }

    public async getById(id: number): Promise<StudyPlanWithRelations | null> {
        try {
            const result = await prisma.studyPlan.findUnique({
                where: {
                    id: id
                },
                include: {
                    subjectInfo: {
                        include: {
                            subject: true
                        }
                    },
                    correlativities: true,
                    career: true
                }
            })

            return result
        }
        catch (error: any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }

    public async getFiltered(params : IGetFilteredParams): Promise<StudyPlan[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize

            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.studyPlan.findMany({
                where: prismaFilter,
                skip: skipAmount,
                take: params.pageSize,
                orderBy: prismaOrder
            })

            return result

        }
        catch (error: any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }

}