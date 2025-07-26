

import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"

const FinalExamRegistrationInputCreateSchema = z.object({
    qualification: z.number().positive().min(1),
    state: z.literal(["Disapproved", "Aprroved", "NotTaken"]), 
    student_id: z.string().min(1),
    final_exam_id: z.string().min(1)

}).strict()

const FinalExamRegistrationInputUpdateSchema = z.object({
    qualification: z.optional(z.number().positive().min(1)),
    state: z.optional(z.literal(["Disapproved", "Aprroved", "NotTaken"])), 
    student_id: z.optional(z.string().min(1)),
    final_exam_id: z.optional(z.string().min(1))

}).strict()


export type FinalExamRegistrationCreateInput = z.infer<typeof FinalExamRegistrationInputCreateSchema>
export type FinalExamRegistrationUpdateInput = z.infer<typeof FinalExamRegistrationInputUpdateSchema>


export class FinalExamRegistrationValidator {

    public static create = (obj : object) : boolean => {

        const result = FinalExamRegistrationInputCreateSchema.safeParse(obj)

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

        const result = FinalExamRegistrationInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}
