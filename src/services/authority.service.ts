
import { Prisma, Authority } from "@prisma/client"
import { AuthorityWithRelations } from "../types"
import { AuthorityRepository } from "../repositories/authority.repository"
import { Encrypter } from "../utils/encryption"

const repository = new AuthorityRepository()

export class AuthorityService {

    public static async get() : Promise<Authority[]> {
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de autoridades: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<AuthorityWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la autoridad solicitada: ${error}`)
        }
    }

    public static async create(authority : Prisma.AuthorityCreateInput) : Promise<Authority> {
        try {

            if (authority.user.create?.password) {
                authority.user.create.password = await Encrypter.encode(authority.user.create.password)
            } 

            const result = await repository.create(authority)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nueva autoridad: ${error}`)
        }
    }

    public static async update(id : number, authority : Prisma.AuthorityCreateInput) : Promise<Authority>  {
        try {
            const authorityExists = await repository.getById(id)

            if (authorityExists === null) {
                throw new Error("La autoridad que desea actualizar no existe")    
            }

            const result = await repository.update(id, authority)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la universidad solicitada: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<Authority> {
        try {
            const authorityExists = await repository.getById(id)

            if (authorityExists === null) {
                throw new Error("La autoridad que desea eliminar no existe")    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la autoridad solicitada: ${error}`)
        }

    }

}