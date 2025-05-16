


import { Prisma, PrismaClient, StudyPlan } from "@prisma/client"
import prisma from "../config/client"
import { StudyPlanWithRelations } from "models/studyPlan.model"

export class StudyPlanRepositorie {

    private readonly db : PrismaClient

    public constructor(){
        this.db = prisma
    }

    public async get() : Promise<StudyPlan[]>{
        try {
            const res = this.db.studyPlan.findMany()
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registros de la Base de Datos: ${error}`)    
        }
    }

    public async getById(id : number) : Promise<StudyPlanWithRelations | null> {
        try {
            const res = this.db.studyPlan.findUnique({
                where: {
                    id: id
                },
                include: {
                    correlativities: true,
                    subject_assignments: true
                }
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registro de la Base de Datos: ${error}`)       
        }
    }

    public async create(studyPlan : Prisma.StudyPlanCreateInput) : Promise<StudyPlan> {
        try {
            const res = this.db.studyPlan.create({
                data: studyPlan
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al crear registro en la Base de Datos: ${error}`)        
        }
    }

    public async update(id : number , data : Prisma.StudyPlanUpdateInput) : Promise<StudyPlan> {
        try {
            const res = this.db.studyPlan.update({
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

    public async delete(id : number) : Promise<StudyPlan> {
        try {
            const res = this.db.studyPlan.delete({
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
