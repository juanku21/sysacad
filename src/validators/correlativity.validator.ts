
import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const CorrelativityInputCreateSchema = z.object({

    course: z.boolean(),
    aprrove: z.boolean(),
    type: z.literal(["Attend", "TakeExam"]),
    subject_id: z.string().min(1),
    correlativitie_id: z.string().min(1),
    study_plan_id: z.string().min(1)

}).strict()

const CorrelativityInputUpdateSchema = z.object({

    course: z.optional(z.boolean()),
    aprrove: z.optional(z.boolean()),
    type: z.optional(z.literal(["Attend", "TakeExam"])),
    subject_id: z.optional(z.string().min(1)),
    correlativitie_id: z.optional(z.string().min(1)),
    study_plan_id: z.optional(z.string().min(1))


}).strict()


export type CorrelativityCreateInput = z.infer<typeof CorrelativityInputCreateSchema>
export type CorrelativityUpdateInput = z.infer<typeof CorrelativityInputUpdateSchema>


export class CorrelativityValidator {

    public static create = (obj : object) : boolean => {

        const result = CorrelativityInputCreateSchema.safeParse(obj)

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

        const result = CorrelativityInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}