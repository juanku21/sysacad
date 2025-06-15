

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Correlativity } from "@prisma/client"
import { CorrelativityService } from "../../src/services/correlativity.service"
import { CorrelativityWithRelations } from "../../src/types" 
import { 
    mockCorrelativity, 
    mockCorrelativityWithRelations, 
    mockCorrelativityArray,
    inputCreate,
    inputUpdate
 } from "../mocks/correlativity.mock"


class CorrelativityServiceTest extends BaseServiceTest 
<typeof prismaMock.correlativity, Correlativity, CorrelativityService, Prisma.CorrelativityCreateInput, Prisma.CorrelativityUpdateInput> {

    constructor(){
        super(prismaMock.correlativity, CorrelativityService)
    }

    public async findById(mockCorrelativity : CorrelativityWithRelations){

        this.mock.findUnique.mockResolvedValue(mockCorrelativity)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockCorrelativity)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const correlativityTest = new CorrelativityServiceTest()


// tests

describe("Correlativity service test", () => {

    test("should return a list with all correlativities info", async () => {

        await correlativityTest.get(mockCorrelativityArray)

    })

    test("should return one correlativity info with all relations", async () => {

        await correlativityTest.findById(mockCorrelativityWithRelations)

    })

    test("should create a new correlativity info", async () => {

        await correlativityTest.create(mockCorrelativity, inputCreate)

    })

    test("should update correlativity info data", async () => {

        await correlativityTest.update(mockCorrelativity, inputUpdate)

    })


    test("should delete a correlativity info", async () => {

        await correlativityTest.delete(mockCorrelativity)

    })


})