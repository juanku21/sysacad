

import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "config/client";


export abstract class BaseRepository <TModel, TEntity, TCreate, TUpdate> {

    protected readonly model : TModel

    constructor(model : TModel){
        this.model = model
    }

    public async get() : Promise<TEntity[]> {
        try {
            const result = await (this.model as any).findMany()
            return result
        } 
        catch (error : any) {
            throw new Error(`Error al leer la base de datos: ${error}`)
        }
    }

    public async create(data : TCreate) : Promise<TEntity> {
        try {
            const result = await (this.model as any).create({
                data: data
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al escribir la base de datos: ${error}`)
        }
    }

    public async update(id: number, data : TUpdate) : Promise<TEntity> {
        try {
            const result = await (this.model as any).update({
                where: {
                    id: id
                },
                data: data
            })

            return result
        } 
        catch (error : any) {
            throw new Error(`Error al escribir la base de datos: ${error}`)
        }
    }

    public async delete(id : number) : Promise<TEntity> {
        try {
            const result = await (this.model as any).delete({
                where: {
                    id: id
                }
            })

            return result
        }
        catch (error : any) {
            throw new Error(`Error al escribir la base de datos: ${error}`)
        }
    }

}