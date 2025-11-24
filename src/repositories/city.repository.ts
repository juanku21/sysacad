
import { Prisma, City} from "@prisma/client"
import { CityWithRelations} from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import prisma from "../config/client"

export class CityRepository extends BaseRepository 
<typeof prisma.city, City, Prisma.CityCreateInput, Prisma.CityUpdateInput> {

    constructor(){
        super(prisma.city)
    }

    public async getById(id : number) : Promise<CityWithRelations | null> {
        try {
            const result = await prisma.city.findUnique({
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
    
    public async getFiltered(filter : string, pageNumber : number = 1, pageSize : number = 100) : Promise<City[]> {
        try {

            const skipAmount = (pageNumber - 1) * pageSize
            
            const prismaFilter = filter ? PrismaFilterTransformer.toPrismaWhere(filter) : {}

            const result = await prisma.city.findMany({
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