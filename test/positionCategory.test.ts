

import { BaseServiceTest } from "./utils/base-test"
import { prismaMock } from "../src/config/singleton"
import { Prisma } from "@prisma/client"
import { PositionCategory } from "@prisma/client"
import { PositionCategoryService } from "../src/services/positionCategory.service"
import { PositionCategoryWithRelations } from "../src/types" 


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


// mocks and input data

const mockPositionCategoryArray : PositionCategory[] = [
    {
        id: 1,
        name: 'Administrador',
        description: "Realiza tareas administrativas en la universidad",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockPositionCategory : PositionCategory = {
    id: 1,
    name: 'Administrador',
    description: "Realiza tareas administrativas en la universidad",
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.PositionCategoryCreateInput = {
    name: 'Administrador',
    description: "Realiza tareas administrativas en la universidad",
}

const inputUpdate : Prisma.PositionCategoryUpdateInput = {
    description: "Realiza actividades administrativas en la universidad"
}

const mockPositionCategoryWithRelations : PositionCategoryWithRelations = {
    id: 1,
    name: 'Administrador',
    description: "Realiza tareas administrativas en la universidad",
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    positions: [
        {
            id: 1,
            name: "Profesor de Análisis Matemático",
            puntaje: 5000,
            area: "Departamento de Ciencias Básicas",
            description: "Excelente cargo",
            category_id: 1,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),

        }
    ]
}


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