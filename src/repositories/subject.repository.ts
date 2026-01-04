
import { Prisma, Subject} from "@prisma/client"
import { SubjectWithRelations, IGetFilteredParams } from "../types"
import { BaseRepository } from "./base.repository"
import { PrismaFilterTransformer } from "../utils/whereAdapter"
import { PrismaOrderByTransformer } from "../utils/orderByAdapter"
import prisma from "../config/client"

export class SubjectRepository extends BaseRepository 
<typeof prisma.subject, Subject, Prisma.SubjectCreateInput, Prisma.SubjectUpdateInput> {

    constructor(){
        super(prisma.subject)
    }

    public async getById(id : number) : Promise<SubjectWithRelations | null> {
        try {
            const result = await prisma.subject.findUnique({
                where: {
                    id: id
                },
                include: {
                    correlativities: {
                        include: {
                            studyPlan: {
                                include: {
                                    career: true
                                }
                            }
                        }
                    },
                    required: {
                        include: {
                            studyPlan: {
                                include: {
                                    career: true
                                }
                            }
                        }
                    }
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos`)
        }
    }   
    
    public async getFiltered(params : IGetFilteredParams) : Promise<Subject[]> {
            try {
    
                const skipAmount = (params.pageNumber - 1) * params.pageSize
                
                const prismaFilter = params.filter ? PrismaFilterTransformer.toPrismaWhere(params.filter) : {}
    
                const prismaOrder = params.order ? PrismaOrderByTransformer.toPrismaOrderBy(params.order) : {}
    
                const result = await prisma.subject.findMany({
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
