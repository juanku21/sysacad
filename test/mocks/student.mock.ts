
import { Prisma, Student } from "@prisma/client"
import { StudentWithRelations } from "../../src/types"

export const mockStudentArray : Student[] = [
    {
        id: 1,
        user_id: 1,
        career_id: 1,
        file: 10000,
    }
]

export const mockStudent : Student = {
    id: 1,
    user_id: 1,
    career_id: 1,
    file: 10000,
}

export const inputCreate : Prisma.StudentCreateInput = {

    file: 10000,

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
    file: 8400,

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
    file: 10000,

    courseRegistrations: [
        {
            id: 1,
            state: "Irregular",
            student_id: 1,
            dicatation_id: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],

    examRegistrations: [
        {
            id: 1,
            qualification: 10,
            state: "Aprroved",
            student_id: 1,
            final_exam_id: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],

    quealifications: [
        {
            id: 1,
            value: 10,
            student_id: 1,
            subject_id: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],

    career: {
        id: 1,
        name: "Ingeniería en Sistemas",
        code: 300,
        level: "Engineering",
        description: "An excelent career for the futuro",
        createdAt: new Date(),
        updatedAt: new Date(),
    },

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
        createdAt: new Date(),
        updatedAt: new Date(),

        faculty: {
            id: 1,
            name: "FRSR",
            code: 500,
            description: null,
            email: "utnfrsr@gmail.com",
            phone: 2609876543,
            street: "Urquiza",
            number: 100,
            cityId: 5,
            university_id: 1,
            web: null,
            createdAt: new Date(),
            updatedAt: new Date(),

            university: {
                id: 1,
                name: "Universidad Tecnológica Nacional",
                acronym: "UTN",
                createdAt: new Date(),
                updatedAt: new Date()
            },

            city: {
                id: 5,
                name: 'San Rafael',
                zip_code: "5600",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }
    }

}