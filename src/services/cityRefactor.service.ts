
import { BaseService } from "./base.service"
import { Prisma, City } from "@prisma/client"
import { CityWithRelations } from "../types"
import { CityRepository } from "../repositories/city.repository"

const repository = new CityRepository()

export class CityService extends BaseService <City, CityWithRelations, Prisma.CityCreateInput, Prisma.CityUpdateInput>{

    constructor(){
        super(repository)
    }

}

export const cityService = new CityService()