

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Authority } from "@prisma/client"
import { AuthorityService } from "../../src/services/authority.service"
import { AuthorityWithRelations } from "../../src/types" 
import { 
    mockAuthority, 
    mockAuthorityWithRelations, 
    mockAuthorityArray,
    inputCreate,
    inputUpdate
 } from "../mocks/authority.mock" 



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