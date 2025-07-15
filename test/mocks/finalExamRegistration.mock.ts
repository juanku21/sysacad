
import { Prisma, FinalExamRegistration } from "@prisma/client"
import { FinalExamRegistrationWithRelations } from "../../src/types"


export const mockFinalExamRegistrationArray : FinalExamRegistration[] = [
    {
        id: 1,
        state: "Aprroved",
        qualification: 10,
        student_id: 3,
        final_exam_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockFinalExamRegistration : FinalExamRegistration = {
    id: 1,
    state: "Aprroved",
    qualification: 10,
    student_id: 3,
    final_exam_id: 2,
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.FinalExamRegistrationCreateInput = {
    qualification: null,
    state: "NotTaken",

    student: {
        connect: {
            id: 3
        }
    },

    exam: {
        connect: {
            id: 2
        }
    }
}

export const inputUpdate : Prisma.FinalExamRegistrationUpdateInput = {
    state: "Aprroved"
}

export const mockFinalExamRegistrationWithRelations : FinalExamRegistrationWithRelations = {
    id: 1,
    state: "Aprroved",
    qualification: 10,
    student_id: 3,
    final_exam_id: 2,
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

    exam: {
        id: 2,
        date: new Date(),
        classroom_id: null,
        subject_info_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
    }
}