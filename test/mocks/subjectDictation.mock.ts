
import { Prisma, SubjectDictation } from "@prisma/client"
import { SubjectDictationWithRelations } from "../../src/types"

export const mockSubjectDictationArray : SubjectDictation[] = [
    {
        id: 1,
        year: 2019,
        subject_info_id: 1,
        classroom_id: null,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockSubjectDictation : SubjectDictation = {
    id: 1,
    year: 2019,
    subject_info_id: 1,
    classroom_id: null,
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.SubjectDictationCreateInput = {
    year: 2019,

    subjectInfo: {
        connect: {
            id: 1
        }
    }
}

export const inputUpdate : Prisma.SubjectDictationUpdateInput = {
    year: 2020
}

export const mockSubjectDictationWithRelations : SubjectDictationWithRelations = {
    id: 1,
    year: 2019,
    subject_info_id: 1,
    classroom_id: null,
    createdAt: new Date(),
    updatedAt: new Date(),

    registrations: [
        {
            id: 1,
            state: "Attending",
            student_id: 1,
            dicatation_id: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],

    teacher: [
        {
            dictation_id: 1,
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
    ],

    subjectInfo: {
        id: 1,
        hours: 4,
        type: "Yearly",
        subject_id: 2,
        study_plan_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }
}
