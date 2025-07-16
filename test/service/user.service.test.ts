
import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma, User } from "@prisma/client"
import { UserService } from "../../src/services/user.service"
import * as mock from "../mocks/user.mock" 


class UserServiceTest extends BaseServiceTest 
<typeof prismaMock.user, User, UserService, Prisma.UserCreateInput, Prisma.UserUpdateInput> {

    constructor(){
        super(prismaMock.user, UserService)
    }

    public async findById(mockUser : User){

        this.mock.findUnique.mockResolvedValue(mockUser)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mock.user)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const userTest = new UserServiceTest()


// tests


describe("User service test", () => {


    test("should return one user without its relations", async () => {

        await userTest.findById(mock.user)
        
    })


})