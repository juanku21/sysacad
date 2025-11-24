
import { Prisma, ClassRoom} from "@prisma/client"
import { ClassRoomWithRelations } from "../types"
import { BaseRepository } from "./base.repository" 
import { PrismaFilterTransformer } from "../utils/whereAdapter"
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
    
    public async getFiltered(filter : string, pageNumber : number = 1, pageSize : number = 100) : Promise<ClassRoom[]> {
        try {

            const skipAmount = (pageNumber - 1) * pageSize
            
            const prismaFilter = filter ? PrismaFilterTransformer.toPrismaWhere(filter) : {}

            const result = await prisma.classRoom.findMany({
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
