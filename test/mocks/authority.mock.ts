
import { Prisma, Authority } from "@prisma/client"
import { AuthorityWithRelations } from "../../src/types"

export const mockAuthorityArray : Authority[] = [
    {
        id: 1,
        user_id: 1,
        tuition: 32000,
        recruitment: new Date()
    }
]

export const mockAuthority : Authority = {
    id: 1,
    user_id: 1,
    tuition: 32000,
    recruitment: new Date()
}

export const inputCreate : Prisma.AuthorityCreateInput = {

    tuition: 32000,
    recruitment: new Date(),

    user: {
        create: {
            name: "Martin",
            last_name: "Montes",
            email: "tinchomo@gmail.com",
            password: "654321",
            cuil: 20727828372,
            phone: 2618009675,
            facultyId: 3
        }
    }

}

export const inputUpdate : Prisma.AuthorityUpdateInput = {
    
    tuition: 40000,

    user: {
        update: {
            password: "111111",
        }
    }

}

export const mockAuthorityWithRelations : AuthorityWithRelations = {
    id: 1,
    user_id: 1,
    tuition: 32000,
    recruitment: new Date(),

    user: {
        id: 1,
        name: "Martin",
        last_name: "Montes",
        email: "tinchomo@gmail.com",
        password: "654321",
        gender: "F",
        cuil: 20727828372,
        phone: 2618009675,
        facultyId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    },

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
    ],

    finalExam: [
        {
            final_exam_id: 4,
            teacher_id: 1,
            finalExam: {
                id: 4,
                classroom_id: null,
                date: new Date(),
                subject_info_id: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }
    ],

    dictation: [
        {
            dictation_id: 6,
            teacher_id: 1,
            dictation: {
                id: 6,
                year: 2018,
                classroom_id: 9,
                subject_info_id: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }
    ]
}