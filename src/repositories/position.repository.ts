import { Prisma, Position} from "@prisma/client"
import { PositionWithRelations} from "../types"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class PositionRepository extends BaseRepository 
<typeof prisma.position, Position, Prisma.PositionCreateInput, Prisma.PositionUpdateInput> {

    constructor(){
        super(prisma.position)
    }

    public async getById(id : number) : Promise<PositionWithRelations | null> {
        try {
            const result = await prisma.position.findUnique({
                where: {
                    id: id
                },
                include: {
                    authority: {
                        include: {
                            authority: true
                        }
                    },
                    category: true
                }
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }   
    
}