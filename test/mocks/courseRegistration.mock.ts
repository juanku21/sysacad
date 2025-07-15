
import { Prisma, CourseRegistration } from "@prisma/client"
import { CourseRegistrationWithRelations } from "../../src/types"

export const mockCourseRegistrationArray : CourseRegistration[] = [
    {
        id: 1,
        state: "Attending",
        student_id: 1,
        dicatation_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockCourseRegistration : CourseRegistration = {
    id: 1,
    state: "Attending",
    student_id: 1,
    dicatation_id: 4,
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.CourseRegistrationCreateInput = {
    state: "Attending",

    dictation: {
        connect: {
            id: 4
        }
    },

    student: {
        connect: {
            id: 1
        }
    }
}

export const inputUpdate : Prisma.CourseRegistrationUpdateInput = {
    state: "Regular"
}

export const mockCourseRegistrationWithRelations : CourseRegistrationWithRelations = {
    id: 1,
    state: "Attending",
    student_id: 1,
    dicatation_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),

    student: {
        id: 1,
        user_id: 1,
        career_id: 1,
        file: 10000,
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
            updatedAt: new Date()
        }
    },

    dictation: {
        id: 2,
        year: 2024,
        subject_info_id: 4,
        classroom_id: null,
        createdAt: new Date(),
        updatedAt: new Date()
    }
}