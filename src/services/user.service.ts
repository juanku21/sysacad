

import { UserWithRelations } from "../types"
import { UserRepository } from "../repositories/user.repository"
import { Encrypter } from "../utils/encryption"
import { PositionService } from "./position.service"

const repository = new UserRepository()

export class UserService {

    public static async getByEmail(email: string) : Promise<UserWithRelations | null> {
        try {
            const result = await repository.getByEmail(email)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener el estudiante solicitado: ${error}`)
        }
    }


    public static async authenticate(email: string, password: string) : Promise<UserWithRelations> {

        try {

            const user = await this.getByEmail(email)

            if (user === null) throw new Error('El usuario con el email proporcionado no existe')

            const pass : boolean = Encrypter.compare(password, user.password)

            if (!pass) throw new Error('La contraseña proporcionada es incorrecta')

            return user
            
        } 
        catch (error : any) {
            throw new Error(`Fallo de autenticación: ${error}`)
        }

    }


    public static async authorize(user : UserWithRelations) : Promise<string[]> {

        try {

            let role : string[] = []

            if (user.student) role.push('Student')
            
            if (user.authority) {
                
                for (const position of user.authority.position) {
                    
                    let positionFullData = await PositionService.getById(position.position_id)

                    if (positionFullData?.category.name) role.push(positionFullData.category.name)
                    
                }

            }

            return role
            
        } 
        catch (error : any) {
            throw new Error(`Fallo de autorización: ${error}`)
        }

    }

}