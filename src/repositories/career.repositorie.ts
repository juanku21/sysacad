

import { Prisma, PrismaClient, Career } from "@prisma/client"
import prisma from "../config/client"
import { CareerWithRelations } from "models/career.model" 

export class CareerRepositorie {

    private readonly db : PrismaClient

    public constructor(){
        this.db = prisma
    }

    public async get() : Promise<Career[]>{
        try {
            const res = this.db.career.findMany()
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registros de la Base de Datos: ${error}`)    
        }
    }

    public async getById(id : number) : Promise<CareerWithRelations | null> {
        try {
            const res = this.db.career.findUnique({
                where: {
                    id: id
                },
                include: {
                    educational_offers: true,
                    study_plans: true,
                    students: true
                }
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registro de la Base de Datos: ${error}`)       
        }
    }

    public async create(career : Prisma.CareerCreateInput) : Promise<Career> {
        try {
            const res = this.db.career.create({
                data: career
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al crear registro en la Base de Datos: ${error}`)        
        }
    }

    public async update(id : number , data : Prisma.CareerUpdateInput) : Promise<Career> {
        try {
            const res = this.db.career.update({
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

    public async delete(id : number) : Promise<Career> {
        try {
            const res = this.db.career.delete({
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