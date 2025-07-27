
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
        createdAt: new Date(),
        updatedAt: new Date()
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
    createdAt: new Date(),
    updatedAt: new Date()
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
    createdAt: new Date(),
    updatedAt: new Date(),

    subjectDictation: [
        {
            id: 1,
            year: 2019,
            subject_info_id: 1,
            classroom_id: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],

    finalExams: [
        {
            id: 2,
            date: new Date(),
            classroom_id: null,
            subject_info_id: 4,
            createdAt: new Date(),
            updatedAt: new Date()
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
        createdAt: new Date(),
        updatedAt: new Date()
    }
}
