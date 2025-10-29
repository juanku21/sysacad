import { Prisma, Correlativity} from "@prisma/client"
import { CorrelativityWithRelations} from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/filterAdapter"
import prisma from "../config/client"

export class CorrelativityRepository extends BaseRepository 
<typeof prisma.correlativity, Correlativity, Prisma.CorrelativityCreateInput, Prisma.CorrelativityUpdateInput> {

    constructor(){
        super(prisma.correlativity)
    }

    public async getById(id : number) : Promise<CorrelativityWithRelations | null> {
        try {
            const result = await prisma.correlativity.findUnique({
                where: {
                    id: id
                },
                include: {
                    studyPlan: {
                        include: {
                            career: true
                        }
                    },
                    correlativity: true,
                    subject: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }
    
    public async getFiltered(filter : string, pageNumber : number = 1, pageSize : number = 100) : Promise<Correlativity[]> {
            try {
    
                const skipAmount = (pageNumber - 1) * pageSize
                
                const prismaFilter = filter ? PrismaFilterTransformer.toPrismaWhere(filter) : {}
    
                console.log(prismaFilter)
    
                const result = await prisma.correlativity.findMany({
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