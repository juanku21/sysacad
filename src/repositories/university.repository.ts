
import { Prisma, University} from "@prisma/client"
import { UniversityWithRelations } from "types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import prisma from "../config/client"

export class UniversityRepository extends BaseRepository 
<typeof prisma.university, University, Prisma.UniversityCreateInput, Prisma.UniversityUpdateInput> {

    constructor(){
        super(prisma.university)
    }

    public async getById(id : number) : Promise<UniversityWithRelations | null> {
        try {
            const result = await prisma.university.findUnique({
                where: {
                    id: id
                },
                include: {
                    faculty: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }

    public async getFiltered(filter : string, pageNumber : number = 1, pageSize : number = 100) : Promise<University[]> {
            try {
    
                const skipAmount = (pageNumber - 1) * pageSize
                
                const prismaFilter = filter ? PrismaFilterTransformer.toPrismaWhere(filter) : {}
    
                console.log(prismaFilter)
    
                const result = await prisma.university.findMany({
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