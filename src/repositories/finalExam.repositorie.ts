
import { Prisma, PrismaClient, FinalExam } from "@prisma/client"
import prisma from "../config/client"
import { FinalExamWithRelations } from "models/finalExam.model"

export class FinalExamRepositorie {

    private readonly db : PrismaClient

    public constructor(){
        this.db = prisma
    }

    public async get() : Promise<FinalExam[]>{
        try {
            const res = this.db.finalExam.findMany()
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registros de la Base de Datos: ${error}`)    
        }
    }

    public async getById(id : number) : Promise<FinalExamWithRelations | null> {
        try {
            const res = this.db.finalExam.findUnique({
                where: {
                    id: id
                },
                include: {
                    assignments: true,
                    registrations: true
                }
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registro de la Base de Datos: ${error}`)       
        }
    }

    public async create(finalExam : Prisma.FinalExamCreateInput) : Promise<FinalExam> {
        try {
            const res = this.db.finalExam.create({
                data: finalExam
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al crear registro en la Base de Datos: ${error}`)        
        }
    }

    public async update(id : number , data : Prisma.FinalExamCreateInput) : Promise<FinalExam> {
        try {
            const res = this.db.finalExam.update({
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

    public async delete(id : number) : Promise<FinalExam> {
        try {
            const res = this.db.finalExam.delete({
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
