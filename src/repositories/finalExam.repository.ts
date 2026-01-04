
import { Prisma, FinalExam } from "@prisma/client"
import { FinalExamWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class FinalExamRepository extends BaseRepository
    <typeof prisma.finalExam, FinalExam, Prisma.FinalExamCreateInput, Prisma.FinalExamUpdateInput> {

    constructor() {
        super(prisma.finalExam)
    }

    public async getById(id: number): Promise<FinalExamWithRelations | null> {
        try {
            const result = await prisma.finalExam.findUnique({
                where: {
                    id: id
                },
                include: {
                    teacher: {
                        include: {
                            teacher: {
                                include: {
                                    user: true
                                }
                            }
                        }
                    },
                    registrations: true,
                    subjectInfo: {
                        include: {
                            subject: true
                        }
                    }
                }
            })

            return result
        }
        catch (error: any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }

    public async getFiltered(params : IGetFilteredParams): Promise<FinalExam[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize

            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.finalExam.findMany({
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