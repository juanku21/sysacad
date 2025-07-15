

import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const FacultyInputCreateSchema = z.object({

    name: z.string().min(1),
    code: z.number().positive().min(1),
    email: z.email(),
    description: z.optional(z.string().min(1)),
    phone: z.number().positive().min(1),
    street: z.string().min(1),
    number: z.number().positive().min(1),
    web: z.optional(z.string().min(1)),
    cityId: z.string().min(1),
    university_id: z.string().min(1),

}).strict()

const FacultyInputUpdateSchema = z.object({

    name: z.optional(z.string().min(1)),
    code: z.optional(z.number().positive().min(1)),
    email: z.optional(z.email()),
    description: z.optional(z.string().min(1)),
    phone: z.optional(z.number().positive().min(1)),
    street: z.optional(z.string().min(1)),
    number: z.optional(z.number().positive().min(1)),
    web: z.optional(z.string().min(1)),
    cityId: z.optional(z.string().min(1)),
    university_id: z.optional(z.string().min(1)),

}).strict()


export type FacultyCreateInput = z.infer<typeof FacultyInputCreateSchema>
export type FacultyUpdateInput = z.infer<typeof FacultyInputUpdateSchema>


export class FacultyValidator {

    public static create = (obj : object) : boolean => {

        const result = FacultyInputCreateSchema.safeParse(obj)

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

        const result = FacultyInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}


