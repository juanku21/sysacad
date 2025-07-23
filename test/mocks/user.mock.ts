
import { UserWithRelations } from "../../src/types"

export const user : UserWithRelations = {
    id: 1,
    name: "Tomi",
    last_name: "Montes",
    email: "tomimo@mail.com",
    password: "$2b$10$RkGKpjq3fA2kazYcMlwHgOe2vHaP9iaxZjXDn2qPeJS2/nSaPBnba",
    cuil: 2044444447,
    phone: 2608127127,
    gender: 'F',
    facultyId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),

    authority: {
        id: 1,
        user_id: 1,
        tuition: 32000,
        recruitment: new Date(),

        position: [
            {
                authority_id: 1,
                position_id: 2,
                position: {
                    id: 2,
                    name: "Profesor de Física",
                    description: "Excelente cargo",
                    puntaje: 3000,
                    area: "Ciencias Básicas",
                    category_id: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            }
        ]
    },

    student: {
        id: 1,
        user_id: 1,
        career_id: 1,
        file: 10000,
    }

}