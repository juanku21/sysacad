

import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const SubjectinfoInputCreateSchema = z.object({
    
    hours: z.number().positive().min(1),
    type: z.literal(["HalfYearly", "Yearly"]),
    subject_id: z.string().min(1),
    study_plan_id: z.string().min(1),

}).strict()

const SubjectinfoInputUpdateSchema = z.object({

    hours: z.optional(z.number().positive().min(1)),
    type:  z.optional(z.literal(["HalfYearly", "Yearly"])),
    subject_id:  z.optional(z.string().min(1)),
    study_plan_id:  z.optional(z.string().min(1)),

}).strict()


export type SubjectInfoCreateInput = z.infer<typeof SubjectinfoInputCreateSchema>
export type SubjectInfoUpdateInput = z.infer<typeof SubjectinfoInputUpdateSchema>


export class SubjectinfoValidator {

    public static create = (obj : object) : boolean => {

        const result = SubjectinfoInputCreateSchema.safeParse(obj)

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

        const result = SubjectinfoInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}
