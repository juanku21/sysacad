


export abstract class BaseRepository <TModel, TEntity, TCreate, TUpdate> {

    protected readonly model : TModel

    constructor(model : TModel){
        this.model = model
    }

    public async get(pageNumber : number = 0, pageSize : number = 100) : Promise<TEntity[]> {
        try {

            const skipAmount : number = pageNumber * pageSize

            const result = await (this.model as any).findMany({
                skip: skipAmount,
                take: pageSize
            })
            return result
        } 
        catch (error : any) {
            console.log(error)
            throw new Error(`Error al leer la base de datos`)
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
            throw new Error(`Error al escribir la base de datos`)
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
            throw new Error(`Error al escribir la base de datos`)
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
            throw new Error(`Error al escribir la base de datos`)
        }
    }

}