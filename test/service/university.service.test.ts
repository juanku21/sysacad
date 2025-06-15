
import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { University } from "@prisma/client"
import { UniversityService } from "../../src/services/university.service"
import { UniversityWithRelations } from "../../src/types"
import { 
    mockUniversity, 
    mockUniversityWithRelations, 
    mockUniversityArray,
    inputCreate,
    inputUpdate
 } from "../mocks/university.mock" 


 
class UniversityServiceTest extends BaseServiceTest 
<typeof prismaMock.university, University, UniversityService, Prisma.UniversityCreateInput, Prisma.UniversityUpdateInput> {

    constructor(){
        super(prismaMock.university, UniversityService)
    }

    public async findById(mockUniversity : UniversityWithRelations){

        this.mock.findUnique.mockResolvedValue(mockUniversity)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockUniversity)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const universityTest = new UniversityServiceTest()


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