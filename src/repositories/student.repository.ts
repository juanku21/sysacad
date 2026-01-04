
import { Prisma, Student} from "@prisma/client"
import { StudentWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class StudentRepository extends BaseRepository 
<typeof prisma.student, Student, Prisma.StudentCreateInput, Prisma.StudentUpdateInput> {

    constructor(){
        super(prisma.student)
    }

    public async getById(id : number) : Promise<StudentWithRelations | null> {
        try {
            const result = await prisma.student.findUnique({
                where: {
                    id: id
                },
                include: {
                    user: {
                        include: {
                            faculty: {
                                include: {
                                    university: true,
                                    city: true
                                }
                            }
                        }
                    },
                    career: true,
                    quealifications: true,
                    courseRegistrations: true,
                    examRegistrations: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }
    
    public async getFiltered(params : IGetFilteredParams) : Promise<Student[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize
            
            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.student.findMany({
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
