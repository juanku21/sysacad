


import { BaseServiceTest } from "./utils/base-test"
import { prismaMock } from "../src/config/singleton"
import { Prisma } from "@prisma/client"
import { EducationalOffer } from "@prisma/client"
import { EducationalOfferService } from "../src/services/educationalOffer.service"
import { EducationalOfferWithRelations } from "../src/types" 


class EducationalOfferServiceTest extends BaseServiceTest 
<typeof prismaMock.educationalOffer, EducationalOffer, EducationalOfferService, Prisma.EducationalOfferCreateInput, Prisma.EducationalOfferUpdateInput> {

    constructor(){
        super(prismaMock.educationalOffer, EducationalOfferService)
    }

    public async findById(mockEducationalOffer : EducationalOfferWithRelations){

        this.mock.findUnique.mockResolvedValue(mockEducationalOffer)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockEducationalOffer)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const educationalOfferTest = new EducationalOfferServiceTest()


// mocks and input data

const mockEducationalOfferArray : EducationalOffer[] = [
    {
        id: 1,
        year: 2022,
        price: 0,
        facultyId: 1,
        careerId: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }
]

const mockEducationalOffer : EducationalOffer = {
    id: 1,
    year: 2022,
    price: 0,
    facultyId: 1,
    careerId: 1,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
}

const inputCreate : Prisma.EducationalOfferCreateInput = {
    year: 2022,
    price: 0,

    faculty: {
        connect: {
            id: 1
        }
    },

    career: {
        connect: {
            id: 1
        }
    }
}

const inputUpdate : Prisma.EducationalOfferUpdateInput = {
    price: 1000
}

const mockEducationalOfferWithRelations : EducationalOfferWithRelations = {
    id: 1,
    year: 2022,
    price: 0,
    facultyId: 1,
    careerId: 1,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),

    career: {
        id: 1,
        name: "Ingeniería en Sistemas",
        code: 540,
        description: "La carrera del futuro",
        level: "Engineering",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
    }
}


// tests


describe("Educational Offer service test", () => {

    test("should return a list with all educational offers", async () => {

        await educationalOfferTest.get(mockEducationalOfferArray)

    })

    test("should return one educational offer with all relations", async () => {

        await educationalOfferTest.findById(mockEducationalOfferWithRelations)

    })

    test("should create a new educational offer", async () => {

        await educationalOfferTest.create(mockEducationalOffer, inputCreate)

    })

    test("should update educational offer data", async () => {

        await educationalOfferTest.update(mockEducationalOffer, inputUpdate)

    })


    test("should delete a educational offer", async () => {

        await educationalOfferTest.delete(mockEducationalOffer)

    })


})