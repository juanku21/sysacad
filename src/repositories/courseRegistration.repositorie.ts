
import { Prisma, PrismaClient, CourseRegistration } from "@prisma/client"
import prisma from "../config/client" 

export class CourseRegistrationRepositorie {

    private readonly db : PrismaClient

    public constructor(){
        this.db = prisma
    }

    public async get() : Promise<CourseRegistration[]>{
        try {
            const res = this.db.courseRegistration.findMany()
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registros de la Base de Datos: ${error}`)    
        }
    }

    public async getById(id : number) : Promise<CourseRegistration | null> {
        try {
            const res = this.db.courseRegistration.findUnique({
                where: {
                    id: id
                }
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registro de la Base de Datos: ${error}`)       
        }
    }

    public async create(courseRegistration : Prisma.CourseRegistrationCreateInput) : Promise<CourseRegistration> {
        try {
            const res = this.db.courseRegistration.create({
                data: courseRegistration
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al crear registro en la Base de Datos: ${error}`)        
        }
    }

    public async update(id : number , data : Prisma.CourseRegistrationUpdateInput) : Promise<CourseRegistration> {
        try {
            const res = this.db.courseRegistration.update({
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

    public async delete(id : number) : Promise<CourseRegistration> {
        try {
            const res = this.db.courseRegistration.delete({
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