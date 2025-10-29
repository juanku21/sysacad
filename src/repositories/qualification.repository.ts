import { Prisma, Qualification} from "@prisma/client"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/filterAdapter"
import prisma from "../config/client"

export class QualificationRepository extends BaseRepository 
<typeof prisma.qualification, Qualification, Prisma.QualificationCreateInput, Prisma.QualificationUpdateInput> {

    constructor(){
        super(prisma.qualification)
    }

    public async getById(id : number) : Promise<Qualification | null> {
        try {
            const result = await prisma.qualification.findUnique({
                where: {
                    id: id
                },
                
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }   

    public async getFiltered(filter : string, pageNumber : number = 1, pageSize : number = 100) : Promise<Qualification[]> {
        try {

            const skipAmount = (pageNumber - 1) * pageSize
            
            const prismaFilter = filter ? PrismaFilterTransformer.toPrismaWhere(filter) : {}

            console.log(prismaFilter)

            const result = await prisma.qualification.findMany({
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
