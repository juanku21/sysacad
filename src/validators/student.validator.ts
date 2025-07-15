

import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const StudentInputCreateSchema = z.object({

    name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8),
    cuil: z.number().positive().min(1),
    phone: z.number().positive().min(1),
    gender: z.optional(z.literal(["M", "F"])),
    facultyId: z.string().min(1),
    file: z.number().positive().min(1),
    career_id: z.string().min(1)

}).strict()

const StudentInputUpdateSchema = z.object({

    name: z.optional(z.string().min(1)),
    last_name: z.optional(z.string().min(1)),
    email: z.optional(z.email()),
    password: z.optional(z.string().min(8)),
    cuil: z.optional(z.number().positive().min(1)),
    phone: z.optional(z.number().positive().min(1)),
    facultyId: z.optional(z.string().min(1)),
    gender: z.optional(z.literal(["M", "F"])),
    file: z.optional(z.number().positive().min(1)),
    career_id: z.optional(z.string().min(1))

}).strict()


export type StudentCreateInput = z.infer<typeof StudentInputCreateSchema>
export type StudentUpdateInput = z.infer<typeof StudentInputUpdateSchema>


export class StudentValidator {

    public static create = (obj : object) : boolean => {

        const result = StudentInputCreateSchema.safeParse(obj)

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

        const result = StudentInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}


