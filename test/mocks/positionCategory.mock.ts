
import { Prisma, PositionCategory } from "@prisma/client"
import { PositionCategoryWithRelations } from "../../src/types"

export const mockPositionCategoryArray : PositionCategory[] = [
    {
        id: 1,
        name: 'Administrator',
        description: "Realiza tareas administrativas en la universidad",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockPositionCategory : PositionCategory = {
    id: 1,
    name: 'Administrator',
    description: "Realiza tareas administrativas en la universidad",
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.PositionCategoryCreateInput = {
    name: 'Administrator',
    description: "Realiza tareas administrativas en la universidad",
}

export const inputUpdate : Prisma.PositionCategoryUpdateInput = {
    description: "Realiza actividades administrativas en la universidad"
}

export const mockPositionCategoryWithRelations : PositionCategoryWithRelations = {
    id: 1,
    name: 'Administrator',
    description: "Realiza tareas administrativas en la universidad",
    createdAt: new Date(),
    updatedAt: new Date(),

    positions: [
        {
            id: 1,
            name: "Profesor de Análisis Matemático",
            puntaje: 5000,
            area: "Departamento de Ciencias Básicas",
            description: "Excelente cargo",
            category_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),

        }
    ]
}
