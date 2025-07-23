
import { Prisma, User } from "@prisma/client"
import { UserWithRelations } from "../types"
import { BaseRepository } from "./base.repository"
import prisma from "../config/client"

export class UserRepository extends BaseRepository 
<typeof prisma.user, User, Prisma.UserCreateInput, Prisma.UserUpdateInput> {

    constructor(){
        super(prisma.user)
    }

    public async getByEmail(email : string) : Promise<UserWithRelations | null> {
        try {
            const result = await prisma.user.findUnique({
                where: {
                    email: email
                },
                include: {
                    student: true,
                    authority: {
                        include: {
                            position: true
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
    
}