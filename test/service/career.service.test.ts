

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Career } from "@prisma/client"
import { CareerService } from "../../src/services/career.service"
import { CareerWithRelations } from "../../src/types" 
import { 
    mockCareer, 
    mockCareerWithRelations, 
    mockCareerArray,
    inputCreate,
    inputUpdate
 } from "../mocks/career.mock" 


class CareerServiceTest extends BaseServiceTest 
<typeof prismaMock.career, Career, CareerService, Prisma.CareerCreateInput, Prisma.CareerUpdateInput> {

    constructor(){
        super(prismaMock.career, CareerService)
    }

    public async findById(mockCareer : CareerWithRelations){

        this.mock.findUnique.mockResolvedValue(mockCareer)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockCareer)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const careerTest = new CareerServiceTest()


// tests


describe("Career service test", () => {

    test("should return a list with all careers", async () => {

        await careerTest.get(mockCareerArray)

    })

    test("should return one career with all relations", async () => {

        await careerTest.findById(mockCareerWithRelations)

    })

    test("should create a new career", async () => {

        await careerTest.create(mockCareer, inputCreate)

    })

    test("should update career data", async () => {

        await careerTest.update(mockCareer, inputUpdate)

    })


    test("should delete a career", async () => {

        await careerTest.delete(mockCareer)

    })


})