
import { Request } from "express"
import { IService, IGetFilteredParams } from "../types"


export class HeaderStrategy {

    private service : IService

    constructor(service : IService){
        this.service = service
    }

    public get = async (req : Request) : Promise<object[]> => {

        let result : object[]

        let params : IGetFilteredParams = {
            pageNumber: 1,
            pageSize: 100,
            filter: null,
            order: null
        }

        typeof req.headers['x-page'] == "string" ? params.pageNumber = parseInt(req.headers['x-page']) : params.pageNumber = 1
        
        typeof req.headers['x-per-page'] == "string" ? params.pageSize = parseInt(req.headers['x-per-page']) : params.pageSize = 100
        
        typeof req.headers['x-filters'] == 'string' ? params.filter = req.headers['x-filters'] : params.filter = null
        
        typeof req.headers['x-sort'] == 'string' ? params.order = req.headers['x-sort'] : params.order = null


        if (params.order || params.filter) {
            result = await this.service.getFiltered(params)
        }
        else{
            result = await this.service.get(params.pageNumber, params.pageSize)
        }


        return result

    }

}