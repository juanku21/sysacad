
import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const StudyPlanInputCreateSchema = z.object({

    description: z.string().min(1),
    effective_from: z.number().positive().min(1),
    code: z.number().positive().min(1),
    duration: z.number().positive().min(1),
    career_id: z.string().min(1)

}).strict()

const StudyPlanInputUpdateSchema = z.object({

    description: z.optional(z.string().min(1)),
    effective_from: z.optional(z.number().positive().min(1)),
    code: z.optional(z.number().positive().min(1)),
    duration: z.optional(z.number().positive().min(1)),
    career_id: z.optional(z.string().min(1))


}).strict()


export type StudyPlanCreateInput = z.infer<typeof StudyPlanInputCreateSchema>
export type StudyPlanUpdateInput = z.infer<typeof StudyPlanInputUpdateSchema>


export class StudyPlanValidator {

    public static create = (obj : object) : boolean => {

        const result = StudyPlanInputCreateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }


    public static update = (obj : object) : boolean => {

        if (isEmpty(obj)) {
            return false
        }

        const result = StudyPlanInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}