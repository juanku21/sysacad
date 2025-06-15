
import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { EducationalOffer } from "@prisma/client"
import { EducationalOfferService } from "../../src/services/educationalOffer.service"
import { EducationalOfferWithRelations } from "../../src/types" 
import { 
    mockEducationalOffer, 
    mockEducationalOfferWithRelations, 
    mockEducationalOfferArray,
    inputCreate,
    inputUpdate
 } from "../mocks/educationalOffer.mock"


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