
import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Student } from "@prisma/client"
import { StudentService } from "../../src/services/student.service"
import { StudentWithRelations } from "../../src/types"
import * as mock from "../mocks/student.mock" 


class StudentServiceTest extends BaseServiceTest 
<typeof prismaMock.student, Student, StudentService, Prisma.StudentCreateInput, Prisma.StudentUpdateInput> {

    constructor(){
        super(prismaMock.student, StudentService)
    }

    public async findById(mockStudent : StudentWithRelations){

        this.mock.findUnique.mockResolvedValue(mockStudent)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockStudent)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const studentTest = new StudentServiceTest()



// tests


describe("Student service test", () => {

    test("should return a list with all students", async () => {

        await studentTest.get(mock.mockStudentArray)

    })

    test("should return one student with all relations", async () => {

        await studentTest.findById(mock.mockStudentWithRelations)

    })

    test("should create a new student", async () => {

        await studentTest.create(mock.mockStudent, mock.inputCreate)

    })

    test("should update student data", async () => {

        await studentTest.update(mock.mockStudent, mock.inputUpdate)

    })


    test("should delete a student", async () => {

        await studentTest.delete(mock.mockStudent)

    })


})