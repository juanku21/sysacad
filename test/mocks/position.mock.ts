
import { Prisma, Position } from "@prisma/client"
import { PositionWithRelations } from "../../src/types"

export const mockPositionArray : Position[] = [
    {
        id: 1,
        name: "Secretario Académico",
        description: "Una excelente posicion",
        puntaje: 1500,
        area: "Administración",
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockPosition : Position = {
    id: 1,
    name: "Secretario Académico",
    description: "Una excelente posicion",
    puntaje: 1500,
    area: "Administración",
    category_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.PositionCreateInput = {
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

export const inputUpdate : Prisma.PositionUpdateInput = {
    description: "Una buena posicion",
    puntaje: 1600
}

export const mockPositionWithRelations : PositionWithRelations = {
    id: 1,
    name: "Secretario Académico",
    description: "Una excelente posicion",
    puntaje: 1500,
    area: "Administración",
    category_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),

    authority: [
        {
            authority_id: 1,
            position_id: 1,
            authority: {
                id: 1,
                user_id: 1,
                tuition: 37328,
                recruitment: new Date()
            }
        }
    ],

    category: {
        id: 1,
        name: 'Teacher',
        description: "Esta categoría incluye los profesores de todas las especialidades",
        createdAt: new Date(),
        updatedAt: new Date()
    }

}