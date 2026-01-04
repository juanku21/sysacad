
import { Prisma, SubjectDictation} from "@prisma/client"
import { SubjectDictationWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class SubjectDictationRepository extends BaseRepository 
<typeof prisma.subjectDictation, SubjectDictation, Prisma.SubjectDictationCreateInput, Prisma.SubjectDictationUpdateInput> {

    constructor(){
        super(prisma.subjectDictation)
    }

    public async getById(id : number) : Promise<SubjectDictationWithRelations | null> {
        try {
            const result = await prisma.subjectDictation.findUnique({
                where: {
                    id: id
                },
                include: {
        registrations: true,
        teacher: {
            include: {
                teacher: {
                    include: {
                        user: true
                    }
                }
            }
        },
        subjectInfo: true
    }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }
    
    public async getFiltered(params : IGetFilteredParams) : Promise<SubjectDictation[]> {
        try {

            const skipAmount = (params.pageNumber - 1) * params.pageSize
            
            const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}

            const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}

            const result = await prisma.subjectDictation.findMany({
                where: prismaFilter,
                skip: skipAmount,
                take: params.pageSize
            })

            return result

        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    } 
    
}