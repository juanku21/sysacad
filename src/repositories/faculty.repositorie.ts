
import { Prisma, PrismaClient, Faculty } from "@prisma/client"
import prisma from "../config/client" 
import { FacultyWithRelations } from "models/faculty.model"

export class FacultyRepositorie {

    private readonly db : PrismaClient

    public constructor(){
        this.db = prisma
    }

    public async get() : Promise<Faculty[]> {
        try {
            const res = this.db.faculty.findMany()
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registros de la Base de Datos: ${error}`)    
        }
    }

    public async getById(id : number) : Promise<FacultyWithRelations | null> {
        try {
            const res = this.db.faculty.findUnique({
                where: {
                    id: id
                },
                include: {
                    users: true,
                    educational_offers: true,
                    class_rooms: true
                }
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registro de la Base de Datos: ${error}`)       
        }
    }

    public async create(faculty : Prisma.FacultyCreateInput) : Promise<Faculty> {
        try {
            const res = this.db.faculty.create({
                data: faculty
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al crear registro en la Base de Datos: ${error}`)        
        }
    }

    public async update(id : number , data : Prisma.FacultyUpdateInput) : Promise<Faculty>{
        try {
            const res = this.db.faculty.update({
                where: {
                    id: id
                },
                data: data
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al actualizar registro en la Base de Datos: ${error}`)     
        }
    }

    public async delete(id : number) : Promise<Faculty>{
        try {
            const res = this.db.faculty.delete({
                where: {
                    id: id
                }
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al eliminar registro de la Base de Datos: ${error}`)     
        }
    }

}
