

import { BaseServiceTest } from "./utils/base-test"
import { prismaMock } from "../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Student } from "@prisma/client"
import { StudentService } from "../src/services/student.service"
import { StudentWithRelations } from "../src/types" 


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


// mocks and input data

const mockStudentArray : Student[] = [
    {
        id: 1,
        user_id: 1,
        career_id: 1,
        legajo: 10000,
    }
]

const mockStudent : Student = {
    id: 1,
    user_id: 1,
    career_id: 1,
    legajo: 10000,
}

const inputCreate : Prisma.StudentCreateInput = {

    legajo: 10000,

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

const inputUpdate : Prisma.StudentUpdateInput = {
    legajo: 8400,

    user: {
        update: {
            password: "345261"
        }
    }

}

const mockStudentWithRelations : StudentWithRelations = {
    id: 1,
    user_id: 1,
    career_id: 1,
    legajo: 10000,

    courseRegistrations: [
        {
            id: 1,
            state: "Irregular",
            student_id: 1,
            dicatation_id: 1,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ],

    examRegistrations: [
        {
            id: 1,
            qualification: 10,
            state: "Aprroved",
            student_id: 1,
            final_exam_id: 4,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ],

    quealifications: [
        {
            id: 1,
            value: 10,
            student_id: 1,
            subject_id: 1,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ],

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
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }

}


// tests


describe("Student service test", () => {

    test("should return a list with all students", async () => {

        await studentTest.get(mockStudentArray)

    })

    test("should return one student with all relations", async () => {

        await studentTest.findById(mockStudentWithRelations)

    })

    test("should create a new student", async () => {

        await studentTest.create(mockStudent, inputCreate)

    })

    test("should update student data", async () => {

        await studentTest.update(mockStudent, inputUpdate)

    })


    test("should delete a student", async () => {

        await studentTest.delete(mockStudent)

    })


})