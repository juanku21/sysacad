
import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { SubjectDictation } from "@prisma/client"
import { SubjectDictationService } from "../../src/services/subjectDictation.service"
import { SubjectDictationWithRelations } from "../../src/types" 
import { 
    mockSubjectDictation, 
    mockSubjectDictationWithRelations, 
    mockSubjectDictationArray,
    inputCreate,
    inputUpdate
 } from "../mocks/subjectDictation.mock"


class SubjectDictationServiceTest extends BaseServiceTest 
<typeof prismaMock.subjectDictation, SubjectDictation, SubjectDictationService, Prisma.SubjectDictationCreateInput, Prisma.SubjectDictationUpdateInput> {

    constructor(){
        super(prismaMock.subjectDictation, SubjectDictationService)
    }

    public async findById(mockSubjectDictation : SubjectDictationWithRelations){

        this.mock.findUnique.mockResolvedValue(mockSubjectDictation)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockSubjectDictation)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const subjectDictationTest = new SubjectDictationServiceTest()


// tests


describe("Subject Dictation service test", () => {

    test("should return a list with all subject dictations info", async () => {

        await subjectDictationTest.get(mockSubjectDictationArray)

    })

    test("should return one subject dictation with all relations", async () => {

        await subjectDictationTest.findById(mockSubjectDictationWithRelations)

    })

    test("should create a new subject dictation", async () => {

        await subjectDictationTest.create(mockSubjectDictation, inputCreate)

    })

    test("should update subject dictation data", async () => {

        await subjectDictationTest.update(mockSubjectDictation, inputUpdate)

    })


    test("should delete a subject dictation", async () => {

        await subjectDictationTest.delete(mockSubjectDictation)

    })


})