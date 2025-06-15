
import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Position } from "@prisma/client"
import { PositionService } from "../../src/services/position.service"
import { PositionWithRelations } from "../../src/types" 


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


// mocks and input data

const mockPositionArray : Position[] = [
    {
        id: 1,
        name: "Secretario Académico",
        description: "Una excelente posicion",
        puntaje: 1500,
        area: "Administración",
        category_id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockPosition : Position = {
    id: 1,
    name: "Secretario Académico",
    description: "Una excelente posicion",
    puntaje: 1500,
    area: "Administración",
    category_id: 1,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.PositionCreateInput = {
    name: "Secretario Académico",
    description: "Una excelente posicion",
    puntaje: 1500,
    area: "Administración",

    category: {
        connect: {
            id: 1
        }
    }
}

const inputUpdate : Prisma.PositionUpdateInput = {
    description: "Una buena posicion",
    puntaje: 1600
}

const mockPositionWithRelations : PositionWithRelations = {
    id: 1,
    name: "Secretario Académico",
    description: "Una excelente posicion",
    puntaje: 1500,
    area: "Administración",
    category_id: 1,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    authority: [
        {
            authority_id: 1,
            position_id: 1,
            authority: {
                id: 1,
                user_id: 1,
                tuition: 37328,
                recruitment: expect.any(Date)
            }
        }
    ]

}


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