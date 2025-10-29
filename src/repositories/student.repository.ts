
import { Prisma, Student} from "@prisma/client"
import { StudentWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/filterAdapter"
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
    
    public async getFiltered(filter : string, pageNumber : number = 1, pageSize : number = 100) : Promise<Student[]> {
        try {

            const skipAmount = (pageNumber - 1) * pageSize
            
            const prismaFilter = filter ? PrismaFilterTransformer.toPrismaWhere(filter) : {}

            console.log(prismaFilter)

            const result = await prisma.student.findMany({
                where: prismaFilter,
                skip: skipAmount,
                take: pageSize
            })

            return result

        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    } 
    
}
