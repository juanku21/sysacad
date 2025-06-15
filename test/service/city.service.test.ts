

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { City } from "@prisma/client"
import { CityService } from "../../src/services/city.service"
import { CityWithRelations } from "../../src/types"
import { 
    mockCity, 
    mockCityWithRelations, 
    mockCityArray,
    inputCreate,
    inputUpdate
 } from "../mocks/city.mock" 


class CityServiceTest extends BaseServiceTest 
<typeof prismaMock.city, City, CityService, Prisma.CityCreateInput, Prisma.CityUpdateInput> {

    constructor(){
        super(prismaMock.city, CityService)
    }

    public async findById(mockCity : CityWithRelations){

        this.mock.findUnique.mockResolvedValue(mockCity)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockCity)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const cityTest = new CityServiceTest()

// tests


describe("City service test", () => {

    test("should return a list with all cities", async () => {

        await cityTest.get(mockCityArray)

    })

    test("should return one city with all relations", async () => {

        await cityTest.findById(mockCityWithRelations)

    })

    test("should create a new city", async () => {

        await cityTest.create(mockCity, inputCreate)

    })

    test("should update city data", async () => {

        await cityTest.update(mockCity, inputUpdate)

    })


    test("should delete a city", async () => {

        await cityTest.delete(mockCity)

    })


})