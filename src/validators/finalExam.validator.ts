

import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const FinalExamInputCreateSchema = z.object({

    date: z.date(),
    subject_info_id: z.string().min(1),
    classroom_id: z.string().min(1)

}).strict()

const FinalExamInputUpdateSchema = z.object({

    date: z.optional(z.date()),
    subject_info_id: z.optional(z.string().min(1)),
    classroom_id: z.optional(z.string().min(1))

}).strict()


export type FinalExamCreateInput = z.infer<typeof FinalExamInputCreateSchema>
export type FinalExamUpdateInput = z.infer<typeof FinalExamInputUpdateSchema>


export class FinalExamValidator {

    public static create = (obj : object) : boolean => {

        const result = FinalExamInputCreateSchema.safeParse(obj)

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

        const result = FinalExamInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}

