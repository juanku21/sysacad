

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Faculty } from "@prisma/client"
import { FacultyService } from "../../src/services/faculty.service"
import { FacultyWithRelations } from "../../src/types" 
import { 
    mockFaculty, 
    mockFacultyWithRelations, 
    mockFacultyArray,
    inputCreate,
    inputUpdate
 } from "../mocks/faculty.mock"


class FacultyServiceTest extends BaseServiceTest 
<typeof prismaMock.faculty, Faculty, FacultyService, Prisma.FacultyCreateInput, Prisma.FacultyUpdateInput> {

    constructor(){
        super(prismaMock.faculty, FacultyService)
    }

    public async findById(mockFaculty : FacultyWithRelations){

        this.mock.findUnique.mockResolvedValue(mockFaculty)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockFaculty)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const facultyTest = new FacultyServiceTest()


// tests


describe("Faculty service test", () => {

    test("should return a list with all faculties", async () => {

        await facultyTest.get(mockFacultyArray)

    })

    test("should return one faculty with all relations", async () => {

        await facultyTest.findById(mockFacultyWithRelations)

    })

    test("should create a new faculty", async () => {

        await facultyTest.create(mockFaculty, inputCreate)

    })

    test("should update faculty data", async () => {

        await facultyTest.update(mockFaculty, inputUpdate)

    })


    test("should delete a faculty", async () => {

        await facultyTest.delete(mockFaculty)

    })


})