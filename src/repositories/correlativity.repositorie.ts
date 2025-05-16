

import { Prisma, PrismaClient, Correlativity } from "@prisma/client"
import prisma from "../config/client"

export class CorrelativityRepositorie {

    private readonly db : PrismaClient

    public constructor(){
        this.db = prisma
    }

    public async get() : Promise<Correlativity[]>{
        try {
            const res = this.db.correlativity.findMany()
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al obtener registros de la Base de Datos: ${error}`)    
        }
    }

    public async getById(id : number) : Promise<Correlativity | null> {
        try {
            const res = this.db.correlativity.findUnique({
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

    public async create(correlativity : Prisma.CorrelativityCreateInput) : Promise<Correlativity> {
        try {
            const res = this.db.correlativity.create({
                data: correlativity
            })
            return res
        } 
        catch (error : any) {
            throw new Error(`Error al crear registro en la Base de Datos: ${error}`)        
        }
    }

    public async update(id : number , data : Prisma.CorrelativityUpdateInput) : Promise<Correlativity> {
        try {
            const res = this.db.correlativity.update({
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

    public async delete(id : number) : Promise<Correlativity> {
        try {
            const res = this.db.correlativity.delete({
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
