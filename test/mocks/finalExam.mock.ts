
import { Prisma, FinalExam } from "@prisma/client"
import { FinalExamWithRelations } from "../../src/types"

export const mockFinalExamArray : FinalExam[] = [
    {
        id: 2,
        date: new Date(),
        classroom_id: null,
        subject_info_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockFinalExam : FinalExam = {
    id: 2,
    date: new Date(),
    classroom_id: null,
    subject_info_id: 4,
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.FinalExamCreateInput = {
    date: new Date(),

    subjectInfo: {
        connect: {
            id: 4
        }
    }
}

export const inputUpdate : Prisma.FinalExamUpdateInput = {
    date: new Date(),

    classroom: {
        connect: {
            id: 17
        }
    }
}

export const mockFinalExamWithRelations : FinalExamWithRelations = {
    id: 2,
    date: new Date(),
    classroom_id: null,
    subject_info_id: 4,
    createdAt: new Date(),
    updatedAt: new Date(),

    subjectInfo: {
        id: 1,
        hours: 4,
        type: "Yearly",
        subject_id: 6,
        study_plan_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),

        subject: {
            id: 6,
            name: "Análisis 2",
            description: "Busca explicar conceptos matemáticos avanzados",
            code: 700,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },

    registrations: [
        {
            id: 1,
            state: "Aprroved",
            qualification: 10,
            student_id: 3,
            final_exam_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],

    teacher: [
        {
            final_exam_id: 2,
            teacher_id: 1,

            teacher: {
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
                }
            }
        }
    ]

}
