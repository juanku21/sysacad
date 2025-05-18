
import { Prisma, University } from "@prisma/client"
import { UniversityWithRelations } from "models/university.model"
import prisma from "../config/client"

export class UniversityRepositorie {

    public static async get() : Promise<University[]>{
        try{
            const result = await prisma.university.findMany()
            return result
        }
        catch(error : any){
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<UniversityWithRelations | null> {
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
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }

    public static async create(university : Prisma.UniversityCreateInput) : Promise<University>{
        try {
            const result = await prisma.university.create({
                data: university
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al escribir la base de datos: ${error}`)
        }
    }

    public static async update(id : number, university : Prisma.UniversityUpdateInput) :  Promise<University>{
        try {
            const result = await prisma.university.update({
                where: {
                    id: id
                },
                data: university
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al escribir la base de datos: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<University>{
        try {
            const result = await prisma.university.delete({
                where: {
                    id: id
                }
            })

            return result
        }
        catch (error : any) {
            throw new Error(`Error al escribir la base de datos: ${error}`)
        }
    }

}