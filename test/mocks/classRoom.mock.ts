
import { Prisma, ClassRoom } from "@prisma/client"
import { ClassRoomWithRelations } from "../../src/types"

export const mockClassRoomArray : ClassRoom[] = [
    {
        id: 1,
        name: "Ambiente Oeste",
        code: 18,
        capacity: 40,
        projector: true,
        board: true,
        wifi: true,
        air_conditioning: true,
        heating: null,
        faculty_id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

export const mockClassRoom : ClassRoom = {
    id: 1,
    name: "Ambiente Oeste",
    code: 18,
    capacity: 40,
    projector: true,
    board: true,
    wifi: true,
    air_conditioning: true,
    heating: null,
    faculty_id: 1,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

export const inputCreate : Prisma.ClassRoomCreateInput = {
    name: "Ambiente Oeste",
    code: 18,
    capacity: 40,
    projector: true,
    board: true,
    wifi: true,
    air_conditioning: true,
    heating: null,

    faculty: {
        connect: {
            id: 1
        }
    },

}

export const inputUpdate : Prisma.ClassRoomUpdateInput = {
    wifi: false,
    air_conditioning: true,
    heating: true
}

export const mockClassRoomWithRelations : ClassRoomWithRelations = {
    id: 1,
    name: "Ambiente Oeste",
    code: 18,
    capacity: 40,
    projector: true,
    board: true,
    wifi: true,
    air_conditioning: true,
    heating: null,
    faculty_id: 1,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    subjectDictation: [
        {
            id: 1,
            year: 2019,
            subject_info_id: 1,
            classroom_id: null,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ],

    finalExams: [
        {
            id: 2,
            date: expect.any(Date),
            classroom_id: null,
            subject_info_id: 4,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ],

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
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
}
