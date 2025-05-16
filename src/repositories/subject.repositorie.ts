

import { Prisma, PrismaClient, Subject } from "@prisma/client"
import prisma from "../config/client"
import { SubjectWithRelations } from "models/subject.model" 

export class SubjectRepositorie {

    private readonly db : PrismaClient

    public constructor(){
        this.db = prisma
    }

    public async get() : Promise<Subject[]>{
        try {
            const res = this.db.subject.findMany()
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registros de la Base de Datos: ${error}`)    
        }
    }

    public async getById(id : number) : Promise<SubjectWithRelations | null> {
        try {
            const res = this.db.subject.findUnique({
                where: {
                    id: id
                },
                include: {
                    assignments: true,
                    correlativities: true,
                    quealifications: true,
                    required: true
                }
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registro de la Base de Datos: ${error}`)       
        }
    }

    public async create(subject : Prisma.SubjectCreateInput) : Promise<Subject> {
        try {
            const res = this.db.subject.create({
                data: subject
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al crear registro en la Base de Datos: ${error}`)        
        }
    }

    public async update(id : number , data : Prisma.SubjectUpdateInput) : Promise<Subject> {
        try {
            const res = this.db.subject.update({
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

    public async delete(id : number) : Promise<Subject> {
        try {
            const res = this.db.subject.delete({
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
