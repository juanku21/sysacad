
export class BaseService <TEntity, TEntityWithRelations, TCreate, TUpdate> {

    private repository : any 

    constructor(repository : any){
        this.repository = repository
    }

    public async get() : Promise<TEntity[]> {
        try {
            const result = await this.repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de entidades: ${error}`)
        }
    }

    public async getById(id : number) : Promise<TEntityWithRelations | null> {
        try {
            const result = await this.repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la entidad solicitada: ${error}`)
        }
    }

    public async create(city : TCreate) : Promise<TEntity>{
        try {
            const result = await this.repository.create(city)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear la entidad solicitad: ${error}`)
        }
    }

    public async update(id : number, city : TUpdate) : Promise<TEntity | null> {
        try {
            const exists = await this.repository.getById(id)

            if (exists === null) {
                return null    
            }

            const result = await this.repository.update(id, city)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar la entidad solicitada: ${error}`)
        }
    }

    public async delete(id : number) : Promise<TEntity | null>{
        try {
            const exists = await this.repository.getById(id)

            if (exists === null) {
                return null   
            }

            const result = await this.repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar la entidad solicitada: ${error}`)
        }

    }

}