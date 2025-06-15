

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { City } from "@prisma/client"
import { CityService } from "../../src/services/city.service"
import { CityWithRelations } from "../../src/types" 


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


// mocks and input data

const mockCityArray : City[] = [
    {
        id: 1,
        name: 'Mendoza',
        zip_code: "5500",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockCity : City = {
    id: 1,
    name: 'Mendoza',
    zip_code: "5500",
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.CityCreateInput = {
    name: 'Mendoza',
    zip_code: "5500"
}

const inputUpdate : Prisma.CityUpdateInput = {
    zip_code: "5520"
}

const mockCityWithRelations : CityWithRelations = {
    id: 1,
    name: 'Mendoza',
    zip_code: "5500",
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    faculty: [
        {
            id: 1,
            name: "Facultad Regional San Rafael",
            code: 25,
            description: null,
            street: "Urquiza",
            number: 876,
            email: "utnfrsr@mail.com",
            phone: expect.any(BigInt),
            web: null,
            university_id: 1,
            cityId: 50,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ]
}


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