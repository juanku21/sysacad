
import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { ClassRoom } from "@prisma/client"
import { ClassRoomService } from "../../src/services/classRoom.service"
import { ClassRoomWithRelations } from "../../src/types" 
import { 
    mockClassRoom, 
    mockClassRoomWithRelations, 
    mockClassRoomArray,
    inputCreate,
    inputUpdate
 } from "../mocks/classRoom.mock" 
 

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