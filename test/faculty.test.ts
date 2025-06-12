

import { BaseServiceTest } from "./utils/base-test"
import { prismaMock } from "../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Faculty } from "@prisma/client"
import { FacultyService } from "../src/services/faculty.service"
import { FacultyWithRelations } from "../src/types" 


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


// mocks and input data

const mockFacultyArray : Faculty[] = [
    {
        id: 1,
        name: "FRSR",
        code: 500,
        description: null,
        email: "utnfrsr@gmail.com",
        phone: 2609876543,
        street: "Urquiza",
        number: 100,
        cityId: 5,
        universityId: 1,
        web: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockFaculty : Faculty = {
    id: 1,
    name: "FRSR",
    code: 500,
    description: null,
    email: "utnfrsr@gmail.com",
    phone: 2609876543,
    street: "Urquiza",
    number: 100,
    cityId: 5,
    universityId: 1,
    web: null,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.FacultyCreateInput = {

    name: "FRSR",
    code: 500,
    email: "utnfrsr@gmail.com",
    phone: 2609876543,
    street: "Urquiza",
    number: 100,

    city: {
        connect: {
            id: 5
        }
    },

    university: {
        connect: {
            id: 1
        }
    }

}

const inputUpdate : Prisma.FacultyUpdateInput = {
    
    street: "San Martin",
    number: 123,

    city: {
        update: {
            id: 2
        }
    }

}


const mockFacultyWithRelations : FacultyWithRelations = {
    id: 1,
    name: "FRSR",
    code: 500,
    description: null,
    email: "utnfrsr@gmail.com",
    phone: 2609876543,
    street: "Urquiza",
    number: 100,
    cityId: 5,
    universityId: 1,
    web: null,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    university: {
        id: 1,
        name: 'Universidad Tecnológica Nacional',
        acronym: "UTN",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    },

    city: {
        id: 5,
        name: "San Rafael",
        zip_code: "5600",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    },

    educational_offers: [
        {
            id: 1,
            year: 2022,
            careerId: 5,
            price: 0,
            facultyId: 1,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ]
}


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