
import { UniversityService } from "../src/services/university.service"
import { Prisma, University } from "@prisma/client"
import { UniversityWithRelations } from "../src/types"
import { prismaMock } from "../src/config/singleton"


// jest.mock('../src/config/client', () => ({
//     __esModule: true,
//     default: {
//         university: {
//             create: jest.fn(),
//             findUnique: jest.fn(),
//             update: jest.fn(),
//             findMany: jest.fn(),
//             delete: jest.fn()
//         },
//     },
// }))


describe("University services tests", () => {

    test("Should return a list of universities", async () => {
        
        const mockUniversity : University[] = [
            {
                id: 1,
                name: 'Universidad Tecnológica Nacional',
                acronym: "UTN",
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            }
        ];

        
        prismaMock.university.findMany.mockResolvedValue(mockUniversity)

        const result = await UniversityService.get()

        expect(result).toEqual(mockUniversity)
        expect(prismaMock.university.findMany).toHaveBeenCalled()
        
    })


    test("Should return a university with relations", async () => {

        const mockUniversity : UniversityWithRelations = {
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
        };

        
        // (prisma.university.findUnique as jest.Mock).mockResolvedValue(mockUniversity)
        prismaMock.university.findUnique.mockResolvedValue(mockUniversity)

        const result = await UniversityService.findById(1)

        expect(result).toEqual(mockUniversity)
        // expect(prisma.university.findUnique).toHaveBeenCalled()
        expect(prismaMock.university.findUnique).toHaveBeenCalled()
        
    })


    test("Should create a new university", async () => {

        const input : Prisma.UniversityCreateInput = {
            name: 'Universidad Tecnológica Nacional',
            acronym: "UTN"
        }

        const mockUniversity : University = {
            id: 1,
            name: 'Universidad Tecnológica Nacional',
            acronym: "UTN",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        };

        
        prismaMock.university.create.mockResolvedValue(mockUniversity)

        const result = await UniversityService.create(input)

        expect(result).toEqual(mockUniversity)
        expect(prismaMock.university.create).toHaveBeenCalled()
        
    })


    test("Should update a university", async () => {

        const input : Prisma.UniversityUpdateInput = {
            name: 'Universidad Tecnológica Nacional',
            acronym: "UTN"
        }

        const mockUniversity : University = {
            id: 1,
            name: 'Universidad Tecnológica Nacional',
            acronym: "UTN",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        };

        
        prismaMock.university.update.mockResolvedValue(mockUniversity)

        const result = await UniversityService.update(1, input)

        expect(result).toEqual(mockUniversity)
        expect(prismaMock.university.update).toHaveBeenCalled()
        
    })


    test("Should delete a university", async () => {

        const mockUniversity : University = {
            id: 1,
            name: 'Universidad Tecnológica Nacional',
            acronym: "UTN",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        };

        
        prismaMock.university.delete.mockResolvedValue(mockUniversity)

        const result = await UniversityService.delete(1)

        expect(result).toEqual(mockUniversity)
        expect(prismaMock.university.delete).toHaveBeenCalled()
        
    })

})