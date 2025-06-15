
import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Position } from "@prisma/client"
import { PositionService } from "../../src/services/position.service"
import { PositionWithRelations } from "../../src/types" 
import { 
    mockPosition, 
    mockPositionWithRelations, 
    mockPositionArray,
    inputCreate,
    inputUpdate
 } from "../mocks/position.mock"



class PositionServiceTest extends BaseServiceTest 
<typeof prismaMock.position, Position, PositionService, Prisma.PositionCreateInput, Prisma.PositionUpdateInput> {

    constructor(){
        super(prismaMock.position, PositionService)
    }

    public async findById(mockPosition : PositionWithRelations){

        this.mock.findUnique.mockResolvedValue(mockPosition)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockPosition)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const positionTest = new PositionServiceTest()



// tests


describe("Position service test", () => {

    test("should return a list with all positions", async () => {

        await positionTest.get(mockPositionArray)

    })

    test("should return one position with all relations", async () => {

        await positionTest.findById(mockPositionWithRelations)

    })

    test("should create a new position", async () => {

        await positionTest.create(mockPosition, inputCreate)

    })

    test("should update position data", async () => {

        await positionTest.update(mockPosition, inputUpdate)

    })


    test("should delete a position", async () => {

        await positionTest.delete(mockPosition)

    })


})