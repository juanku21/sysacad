
import { Prisma, Student } from "@prisma/client"
import { StudentWithRelations } from "../../src/types"

export const mockStudentArray : Student[] = [
    {
        id: 1,
        user_id: 1,
        career_id: 1,
        legajo: 10000,
    }
]

export const mockStudent : Student = {
    id: 1,
    user_id: 1,
    career_id: 1,
    legajo: 10000,
}

export const inputCreate : Prisma.StudentCreateInput = {

    legajo: 10000,

    user: {
        create: {
            name: "Tomás",
            last_name: "Montes",
            email: "tomimo@gmail.com",
            password: "123456",
            cuil: 20727828372,
            phone: 2618009675,
            facultyId: 3
        }
    },

    career: {
        connect: {
            id: 1
        }
    }

}

export const inputUpdate : Prisma.StudentUpdateInput = {
    legajo: 8400,

    user: {
        update: {
            password: "345261"
        }
    }

}

export const mockStudentWithRelations : StudentWithRelations = {
    id: 1,
    user_id: 1,
    career_id: 1,
    legajo: 10000,

    courseRegistrations: [
        {
            id: 1,
            state: "Irregular",
            student_id: 1,
            dicatation_id: 1,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ],

    examRegistrations: [
        {
            id: 1,
            qualification: 10,
            state: "Aprroved",
            student_id: 1,
            final_exam_id: 4,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ],

    quealifications: [
        {
            id: 1,
            value: 10,
            student_id: 1,
            subject_id: 1,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ],

    user: {
        id: 1,
        name: "Tomás",
        last_name: "Montes",
        email: "tomimo@gmail.com",
        password: "123456",
        gender: "F",
        cuil: 20727828372,
        phone: 2618009675,
        facultyId: 3,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }

}