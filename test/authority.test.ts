

import { BaseServiceTest } from "./utils/base-test"
import { prismaMock } from "../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Authority } from "@prisma/client"
import { AuthorityService } from "../src/services/authority.service"
import { AuthorityWithRelations } from "../src/types" 


class AuthorityServiceTest extends BaseServiceTest 
<typeof prismaMock.authority, Authority, AuthorityService, Prisma.AuthorityCreateInput, Prisma.AuthorityUpdateInput> {

    constructor(){
        super(prismaMock.authority, AuthorityService)
    }

    public async findById(mockAuthority : AuthorityWithRelations){

        this.mock.findUnique.mockResolvedValue(mockAuthority)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockAuthority)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const authorityTest = new AuthorityServiceTest()


// mocks and input data

const mockAuthorityArray : Authority[] = [
    {
        id: 1,
        userId: 1,
        tuition: 32000,
        recruitment: expect.any(Date)
    }
]

const mockAuthority : Authority = {
    id: 1,
    userId: 1,
    tuition: 32000,
    recruitment: expect.any(Date)
}

const inputCreate : Prisma.AuthorityCreateInput = {

    tuition: 32000,
    recruitment: expect.any(Date),

    user: {
        create: {
            name: "Martin",
            last_name: "Montes",
            email: "tinchomo@gmail.com",
            password: "654321",
            cuil: 20727828372,
            phone: 2618009675,
            facultyId: 3
        }
    }

}

const inputUpdate : Prisma.AuthorityUpdateInput = {
    
    tuition: 40000,

    user: {
        update: {
            password: "111111",
        }
    }

}

const mockAuthorityWithRelations : AuthorityWithRelations = {
    id: 1,
    userId: 1,
    tuition: 32000,
    recruitment: expect.any(Date),

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
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    },

    position: [
        {
            authorityId: 1,
            positionId: 2,
            position: {
                id: 2,
                name: "Profesor de Física",
                description: "Excelente cargo",
                puntaje: 3000,
                area: "Ciencias Básicas",
                categoryId: 2,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            }
        }
    ],

    final_exam: [
        {
            final_exam_id: 4,
            teacher_id: 1,
            final_exam: {
                id: 4,
                classroom_id: null,
                date: expect.any(Date),
                subject_id: 5,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            }
        }
    ],

    dictation: [
        {
            dictation_id: 6,
            teacher_id: 1,
            dictation: {
                id: 6,
                year: 2018,
                classroom_id: 9,
                subject_id: 5,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            }
        }
    ]
}


// tests


describe("Authority service test", () => {

    test("should return a list with all authorities", async () => {

        await authorityTest.get(mockAuthorityArray)

    })

    test("should return one authority with all relations", async () => {

        await authorityTest.findById(mockAuthorityWithRelations)

    })

    test("should create a new authority", async () => {

        await authorityTest.create(mockAuthority, inputCreate)

    })

    test("should update authority data", async () => {

        await authorityTest.update(mockAuthority, inputUpdate)

    })


    test("should delete a authority", async () => {

        await authorityTest.delete(mockAuthority)

    })


})