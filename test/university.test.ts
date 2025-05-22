
import { BaseServiceTest } from "./utils/base-test"
import { prismaMock } from "../src/config/singleton"
import { Prisma, PrismaClient } from "@prisma/client"
import { University } from "@prisma/client"
import { UniversityService } from "../src/services/university.service"
import { UniversityWithRelations } from "../src/types" 


class UniversityServiceTest extends BaseServiceTest 
<typeof prismaMock.university, University, UniversityService, Prisma.UniversityCreateInput, Prisma.UniversityUpdateInput> {

    constructor(){
        super(prismaMock.university, UniversityService)
    }

    public async findById(mockUniversity : UniversityWithRelations){

        this.mock.findUnique.mockResolvedValue(mockUniversity)

        const result = await (this.service as any).findById(1)

        expect(result).toEqual(mockUniversity)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const universityTest = new UniversityServiceTest()


// mocks and input data

const mockUniversityArray : University[] = [
    {
        id: 1,
        name: 'Universidad Tecnológica Nacional',
        acronym: "UTN",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockUniversity : University = {
    id: 1,
    name: 'Universidad Tecnológica Nacional',
    acronym: "UTN",
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.UniversityCreateInput = {
    name: 'Universidad Tecnológica Nacional',
    acronym: "UTN"
}

const inputUpdate : Prisma.UniversityUpdateInput = {
    name: 'Universidad Tecnológica Nacional',
    acronym: "UTN"
}

const mockUniversityWithRelations : UniversityWithRelations = {
    id: 1,
    name: 'Universidad Tecnológica Nacional',
    acronym: "UTN",
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
    faculty: [
        {
            id: 1,
            name: "Facultad Regional San Rafael",
            code: 25,
            description: null,
            street: "Urquiza",
            number: 876,
            email: "utnfrsr@mail.com",
            phone: expect.any(BigInt),
            web: null,
            universityId: 1,
            cityId: 50,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    ]
}


// tests


describe("University service test", () => {

    test("should return a list with all universities", async () => {

        await universityTest.get(mockUniversityArray)

    })

    test("should return one university with all relations", async () => {

        await universityTest.findById(mockUniversityWithRelations)

    })

    test("should create a new university", async () => {

        await universityTest.create(mockUniversity, inputCreate)

    })

    test("should update university data", async () => {

        await universityTest.update(mockUniversity, inputUpdate)

    })


    test("should delete a university", async () => {

        await universityTest.delete(mockUniversity)

    })


})