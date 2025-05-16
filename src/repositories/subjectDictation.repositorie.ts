

import { Prisma, PrismaClient, SubjectDictation } from "@prisma/client"
import prisma from "../config/client"
import { SubjectDictationWithRelations } from "models/subjectDictation.model" 

export class SubjectDictationRepositorie {

    private readonly db : PrismaClient

    public constructor(){
        this.db = prisma
    }

    public async get() : Promise<SubjectDictation[]>{
        try {
            const res = this.db.subjectDictation.findMany()
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registros de la Base de Datos: ${error}`)    
        }
    }

    public async getById(id : number) : Promise<SubjectDictationWithRelations | null> {
        try {
            const res = this.db.subjectDictation.findUnique({
                where: {
                    id: id
                },
                include: {
                    registrations: true,
                    assigments: true
                }
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registro de la Base de Datos: ${error}`)       
        }
    }

    public async create(subjectDictation : Prisma.SubjectDictationCreateInput) : Promise<SubjectDictation> {
        try {
            const res = this.db.subjectDictation.create({
                data: subjectDictation 
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al crear registro en la Base de Datos: ${error}`)        
        }
    }

    public async update(id : number , data : Prisma.SubjectDictationUpdateInput) : Promise<SubjectDictation> {
        try {
            const res = this.db.subjectDictation.update({
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

    public async delete(id : number) : Promise<SubjectDictation> {
        try {
            const res = this.db.subjectDictation.delete({
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