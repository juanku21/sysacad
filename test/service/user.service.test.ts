
import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { UserService } from "../../src/services/user.service"
import { UserWithRelations } from "../../src/types"
import * as mock from "../mocks/user.mock"
import { mockPositionWithRelations } from "../mocks/position.mock"


class UserServiceTest extends BaseServiceTest 
<typeof prismaMock.user, UserWithRelations, UserService, Prisma.UserCreateInput, Prisma.UserUpdateInput> {

    constructor(){
        super(prismaMock.user, UserService)
    }

    public async findByEmail(mockUser : UserWithRelations){

        this.mock.findUnique.mockResolvedValue(mockUser)

        const result = await (this.service as any).getByEmail(1)

        expect(result).toEqual(mockUser)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }


    public async authenticate(mockAuth : UserWithRelations){

        this.mock.findUnique.mockResolvedValue(mockAuth)

        const result = await (this.service as any).authenticate("tomimo@mail.com", "camicami123")

        expect(result).toEqual(mockAuth)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const userTest = new UserServiceTest()


// tests


describe("User service test", () => {


    test("should return one user with relations", async () => {

        await userTest.findByEmail(mock.user)
        
    })

    test("should return one user with relations if he/she is registered", async () => {

        await userTest.authenticate(mock.user)

    })


    test("should return one user with relations or any error", async () => {

        prismaMock.position.findUnique.mockResolvedValue(mockPositionWithRelations)

        const result = await (UserService as any).authorize(mock.user)

        expect(result).toEqual(['Student', 'Teacher'])
        expect(prismaMock.position.findUnique).toHaveBeenCalled()

    })


})