

import { Prisma, PrismaClient, ClassRoom } from "@prisma/client"
import prisma from "../config/client" 
import { ClassRoomWithRelation } from "models/classRoom.model"

export class ClassRoomRepositorie {

    private readonly db : PrismaClient

    public constructor(){
        this.db = prisma
    }

    public async get() : Promise<ClassRoom[]> {
        try {
            const res = this.db.classRoom.findMany()
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registros de la Base de Datos: ${error}`)    
        }
    }

    public async getById(id : number) : Promise<ClassRoomWithRelation | null> {
        try {
            const res = this.db.classRoom.findUnique({
                where: {
                    id: id
                },
                include: {
                    final_exams: true,
                    subject_dictatios: true
                }
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registro de la Base de Datos: ${error}`)       
        }
    }

    public async create(classRoom : Prisma.ClassRoomCreateInput) : Promise<ClassRoom> {
        try {
            const res = this.db.classRoom.create({
                data: classRoom
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al crear registro en la Base de Datos: ${error}`)        
        }
    }

    public async update(id : number , data : Prisma.ClassRoomUpdateInput) : Promise<ClassRoom> {
        try {
            const res = this.db.classRoom.update({
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

    public async delete(id : number) : Promise<ClassRoom> {
        try {
            const res = this.db.classRoom.delete({
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