
import { BaseServiceTest } from "../utils/baseServiceTest"
import { prismaMock } from "../../src/config/singleton"
import { Prisma } from "@prisma/client"
import { StudyPlan } from "@prisma/client"
import { StudyPlanService } from "../../src/services/studyPlan.service"
import { StudyPlanWithRelations } from "../../src/types" 
import { 
    mockStudyPlan, 
    mockStudyPlanWithRelations, 
    mockStudyPlanArray,
    inputCreate,
    inputUpdate
 } from "../mocks/studyPlan.mock" 



class StudyPlanServiceTest extends BaseServiceTest 
<typeof prismaMock.studyPlan, StudyPlan, StudyPlanService, Prisma.StudyPlanCreateInput, Prisma.StudyPlanUpdateInput> {

    constructor(){
        super(prismaMock.studyPlan, StudyPlanService)
    }

    public async findById(mockStudyPlan : StudyPlanWithRelations){

        this.mock.findUnique.mockResolvedValue(mockStudyPlan)

        const result = await (this.service as any).getById(1)

        expect(result).toEqual(mockStudyPlan)
        expect(this.mock.findUnique).toHaveBeenCalled()

    }

}

const studyPlanTest = new StudyPlanServiceTest()


// tests


describe("Study plan service test", () => {

    test("should return a list with all study plans", async () => {

        await studyPlanTest.get(mockStudyPlanArray)

    })

    test("should return one study plan with all relations", async () => {

        await studyPlanTest.findById(mockStudyPlanWithRelations)

    })

    test("should create a new study plan", async () => {

        await studyPlanTest.create(mockStudyPlan, inputCreate)

    })

    test("should update study plan data", async () => {

        await studyPlanTest.update(mockStudyPlan, inputUpdate)

    })


    test("should delete a study plan", async () => {

        await studyPlanTest.delete(mockStudyPlan)

    })


})