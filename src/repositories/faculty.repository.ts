import { Prisma, Faculty} from "@prisma/client"
import { FacultyWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/filterAdapter"
import prisma from "../config/client"

export class FacultyRepository extends BaseRepository 
<typeof prisma.faculty, Faculty, Prisma.FacultyCreateInput, Prisma.FacultyUpdateInput> {

    constructor(){
        super(prisma.faculty)
    }

    public async getById(id : number) : Promise<FacultyWithRelations | null> {
        try {
            const result = await prisma.faculty.findUnique({
                where: {
                    id: id
                },
                include: {
                    educationalOffers: true,
                    university: true,
                    city: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }

    public async getFiltered(filter : string, pageNumber : number = 1, pageSize : number = 100) : Promise<Faculty[]> {
        try {

            const skipAmount = (pageNumber - 1) * pageSize
            
            const prismaFilter = filter ? PrismaFilterTransformer.toPrismaWhere(filter) : {}

            console.log(prismaFilter)

            const result = await prisma.faculty.findMany({
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
