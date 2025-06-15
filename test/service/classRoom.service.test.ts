
import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { ClassRoom } from "@prisma/client"
import { ClassRoomService } from "../../src/services/classRoom.service"
import { ClassRoomWithRelations } from "../../src/types" 


class ClassRoomServiceTest extends BaseServiceTest 
<typeof prismaMock.classRoom, ClassRoom, ClassRoomService, Prisma.ClassRoomCreateInput, Prisma.ClassRoomUpdateInput> {

    constructor(){
        super(prismaMock.classRoom, ClassRoomService)
    }

    public async findById(mockClassRoom : ClassRoomWithRelations){

        this.mock.findUnique.mockResolvedValue(mockClassRoom)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockClassRoom)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const classRoomTest = new ClassRoomServiceTest()


// mocks and input data

const mockClassRoomArray : ClassRoom[] = [
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

const mockClassRoom : ClassRoom = {
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

const inputCreate : Prisma.ClassRoomCreateInput = {
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

const inputUpdate : Prisma.ClassRoomUpdateInput = {
    wifi: false,
    air_conditioning: true,
    heating: true
}

const mockClassRoomWithRelations : ClassRoomWithRelations = {
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


// tests

describe("Class room service test", () => {

    test("should return a list with all class rooms info", async () => {

        await classRoomTest.get(mockClassRoomArray)

    })

    test("should return one class room info with all relations", async () => {

        await classRoomTest.findById(mockClassRoomWithRelations)

    })

    test("should create a new class room info", async () => {

        await classRoomTest.create(mockClassRoom, inputCreate)

    })

    test("should update class room info data", async () => {

        await classRoomTest.update(mockClassRoom, inputUpdate)

    })


    test("should delete a class room info", async () => {

        await classRoomTest.delete(mockClassRoom)

    })


})