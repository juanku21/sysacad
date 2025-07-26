
import { Prisma, Qualification } from "@prisma/client"

export const mockQualificationArray : Qualification[] = [
    {
        id: 1,
        value: 10,
        student_id: 1,
        subject_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockQualification : Qualification = {
    id: 1,
    value: 10,
    student_id: 1,
    subject_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
}

export const inputCreate : Prisma.QualificationCreateInput = {
    value: 10,

    student: {
        connect: {
            id: 1
        }
    },

    subject: {
        connect: {
            id: 1
        }
    }
}

export const inputUpdate : Prisma.QualificationUpdateInput = {
    value: 9
}
