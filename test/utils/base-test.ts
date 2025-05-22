


export abstract class BaseServiceTest <TMock, TData, TService, TCreate, TUpdate> {

    protected readonly mock : TMock
    protected readonly service : TService

    constructor(mock : TMock, service : TService){
        this.mock = mock
        this.service = service
    }

    public async get(mockData : TData[]) : Promise<void> {

        (this.mock as any).findMany.mockResolvedValue(mockData)
        
        const result = await (this.service as any).get()
        
        expect(result).toEqual(mockData)
        expect((this.mock as any).findMany).toHaveBeenCalled()

    }

    public async create(mockData : TData, input : TCreate) : Promise<void> {

        (this.mock as any).create.mockResolvedValue(mockData)

        const result = await (this.service as any).create(input)

        expect(result).toEqual(mockData)
        expect((this.mock as any).create).toHaveBeenCalled()

    }

    public async update(mockData : TData, input : TUpdate) : Promise<void> {
        
        (this.mock as any).update.mockResolvedValue(mockData)
        
        const result = await (this.service as any).update(1, input)
        
        expect(result).toEqual(mockData)
        expect((this.mock as any).update).toHaveBeenCalled()

    }

    public async delete(mockData : TData) : Promise<void> {

        (this.mock as any).delete.mockResolvedValue(mockData)
        
        const result = await (this.service as any).delete(1)
        
        expect(result).toEqual(mockData)
        expect((this.mock as any).delete).toHaveBeenCalled()

    }

}