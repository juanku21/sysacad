

import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const SubjectInputCreateSchema = z.object({

    name: z.string().min(1),
    code: z.number().positive().min(1),
    description: z.string().min(1)

}).strict()

const SubjectInputUpdateSchema = z.object({

    name: z.optional(z.string().min(1)),
    code: z.optional(z.number().positive().min(1)),
    description: z.optional(z.string().min(1))

}).strict()


export type SubjectCreateInput = z.infer<typeof SubjectInputCreateSchema>
export type SubjectUpdateInput = z.infer<typeof SubjectInputUpdateSchema>


export class SubjectValidator {

    public static create = (obj : object) : boolean => {

        const result = SubjectInputCreateSchema.safeParse(obj)

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

        const result = SubjectInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}


