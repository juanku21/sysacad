

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { SubjectInfo } from "@prisma/client"
import { SubjectInfoService } from "../../src/services/subjectInfo.service"
import { SubjectInfoWithRelations } from "../../src/types"
import { 
    mockSubjectInfo, 
    mockSubjectInfoWithRelations, 
    mockSubjectInfoArray,
    inputCreate,
    inputUpdate
 } from "../mocks/subjectInfo.mock"


class SubjectInfoServiceTest extends BaseServiceTest 
<typeof prismaMock.subjectInfo, SubjectInfo, SubjectInfoService, Prisma.SubjectInfoCreateInput, Prisma.SubjectInfoUpdateInput> {

    constructor(){
        super(prismaMock.subjectInfo, SubjectInfoService)
    }

    public async findById(mockSubjectInfo : SubjectInfoWithRelations){

        this.mock.findUnique.mockResolvedValue(mockSubjectInfo)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockSubjectInfo)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const subjectInfoTest = new SubjectInfoServiceTest()


// tests


describe("Subject Info service test", () => {

    test("should return a list with all subjects info", async () => {

        await subjectInfoTest.get(mockSubjectInfoArray)

    })

    test("should return one subject info with all relations", async () => {

        await subjectInfoTest.findById(mockSubjectInfoWithRelations)

    })

    test("should create a new subject info", async () => {

        await subjectInfoTest.create(mockSubjectInfo, inputCreate)

    })

    test("should update subject info data", async () => {

        await subjectInfoTest.update(mockSubjectInfo, inputUpdate)

    })


    test("should delete a subject info", async () => {

        await subjectInfoTest.delete(mockSubjectInfo)

    })


})