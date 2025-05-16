

import { Prisma, PrismaClient, Qualification } from "@prisma/client"
import prisma from "../config/client"

export class QualificationRepositorie {

    private readonly db : PrismaClient

    public constructor(){
        this.db = prisma
    }

    public async get() : Promise<Qualification[]>{
        try {
            const res = this.db.qualification.findMany()
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registros de la Base de Datos: ${error}`)    
        }
    }

    public async getById(id : number) : Promise<Qualification | null> {
        try {
            const res = this.db.qualification.findUnique({
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

    public async create(qualification : Prisma.QualificationCreateInput) : Promise<Qualification> {
        try {
            const res = this.db.qualification.create({
                data: qualification
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al crear registro en la Base de Datos: ${error}`)        
        }
    }

    public async update(id : number , data : Prisma.QualificationUpdateInput) : Promise<Qualification> {
        try {
            const res = this.db.qualification.update({
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

    public async delete(id : number) : Promise<Qualification> {
        try {
            const res = this.db.qualification.delete({
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
