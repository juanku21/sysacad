

import { User } from "@prisma/client"
import { UserRepository } from "../repositories/user.repository"

const repository = new UserRepository()

export class UserService {

    public static async getById(email: string) : Promise<User | null> {
        try {
            const result = await repository.getByEmail(email)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener el estudiante solicitado: ${error}`)
        }
    }

}