import { Prisma, FinalExam } from "@prisma/client"
import { FinalExamWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/filterAdapter"
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

    public async getFiltered(filter: string, pageNumber: number = 1, pageSize: number = 100): Promise<FinalExam[]> {
        try {

            const skipAmount = (pageNumber - 1) * pageSize

            const prismaFilter = filter ? PrismaFilterTransformer.toPrismaWhere(filter) : {}

            console.log(prismaFilter)

            const result = await prisma.finalExam.findMany({
                where: prismaFilter,
                skip: skipAmount,
                take: pageSize
            })

            return result

        }
        catch (error: any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }

}