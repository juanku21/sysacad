

import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { Subject } from "@prisma/client"
import { SubjectService } from "../../src/services/subject.service"
import { SubjectWithRelations } from "../../src/types" 
import { 
    mockSubject, 
    mockSubjectWithRelations, 
    mockSubjectArray,
    inputCreate,
    inputUpdate
 } from "../mocks/subject.mock"


class SubjectServiceTest extends BaseServiceTest 
<typeof prismaMock.subject, Subject, SubjectService, Prisma.SubjectCreateInput, Prisma.SubjectUpdateInput> {

    constructor(){
        super(prismaMock.subject, SubjectService)
    }

    public async findById(mockSubject : SubjectWithRelations){

        this.mock.findUnique.mockResolvedValue(mockSubject)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockSubject)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const subjectTest = new SubjectServiceTest()



// tests


describe("Subject service test", () => {

    test("should return a list with all subjects", async () => {

        await subjectTest.get(mockSubjectArray)

    })

    test("should return one subject with all relations", async () => {

        await subjectTest.findById(mockSubjectWithRelations)

    })

    test("should create a new subject", async () => {

        await subjectTest.create(mockSubject, inputCreate)

    })

    test("should update subject data", async () => {

        await subjectTest.update(mockSubject, inputUpdate)

    })


    test("should delete a subject", async () => {

        await subjectTest.delete(mockSubject)

    })


})