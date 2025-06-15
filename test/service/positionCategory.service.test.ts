

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { PositionCategory } from "@prisma/client"
import { PositionCategoryService } from "../../src/services/positionCategory.service"
import { PositionCategoryWithRelations } from "../../src/types"
import { 
    mockPositionCategory, 
    mockPositionCategoryWithRelations, 
    mockPositionCategoryArray,
    inputCreate,
    inputUpdate
 } from "../mocks/positionCategory.mock"


class PositionCategoryServiceTest extends BaseServiceTest 
<typeof prismaMock.positionCategory, PositionCategory, PositionCategoryService, Prisma.PositionCategoryCreateInput, Prisma.PositionCategoryUpdateInput> {

    constructor(){
        super(prismaMock.positionCategory, PositionCategoryService)
    }

    public async findById(mockPositionCategory : PositionCategoryWithRelations){

        this.mock.findUnique.mockResolvedValue(mockPositionCategory)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockPositionCategory)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const positionCategoryTest = new PositionCategoryServiceTest()


// tests


describe("Position category service test", () => {

    test("should return a list with all position categories", async () => {

        await positionCategoryTest.get(mockPositionCategoryArray)

    })

    test("should return one position category with all relations", async () => {

        await positionCategoryTest.findById(mockPositionCategoryWithRelations)

    })

    test("should create a new position category", async () => {

        await positionCategoryTest.create(mockPositionCategory, inputCreate)

    })

    test("should update position category data", async () => {

        await positionCategoryTest.update(mockPositionCategory, inputUpdate)

    })


    test("should delete a position category", async () => {

        await positionCategoryTest.delete(mockPositionCategory)

    })


})