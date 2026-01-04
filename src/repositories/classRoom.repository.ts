
import { Prisma, ClassRoom} from "@prisma/client"
import { ClassRoomWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository" 
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class ClassRoomRepository extends BaseRepository 
<typeof prisma.classRoom, ClassRoom, Prisma.ClassRoomCreateInput, Prisma.ClassRoomUpdateInput> {

    constructor(){
        super(prisma.classRoom)
    }

    public async getById(id : number) : Promise<ClassRoomWithRelations | null> {
        try {
            const result = await prisma.classRoom.findUnique({
                where: {
                    id: id
                },
                include: {
                    subjectDictation: true,
                    finalExams: true,
                    faculty: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }   
    
    public async getFiltered(params : IGetFilteredParams) : Promise<ClassRoom[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize
            
            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.classRoom.findMany({
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
