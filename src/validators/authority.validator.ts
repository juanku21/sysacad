

import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const AuthorityInputCreateSchema = z.object({

    name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8),
    cuil: z.number().positive().min(1),
    phone: z.number().positive().min(1),
    gender: z.optional(z.literal(["M", "F"])),
    facultyId: z.string().min(1),
    tuition: z.number().positive().min(1),
    recruitment: z.date()

}).strict()

const AuthorityInputUpdateSchema = z.object({

    name: z.optional(z.string().min(1)),
    last_name: z.optional(z.string().min(1)),
    email: z.optional(z.email()),
    password: z.optional(z.string().min(8)),
    cuil: z.optional(z.number().positive().min(1)),
    phone: z.optional(z.number().positive().min(1)),
    gender: z.optional(z.literal(["M", "F"])),
    facultyId: z.optional(z.string().min(1)),
    tuition: z.optional(z.number().positive().min(1)),
    recruitment: z.optional(z.date())
    
}).strict()


export type AuthorityCreateInput = z.infer<typeof AuthorityInputCreateSchema>
export type AuthorityUpdateInput = z.infer<typeof AuthorityInputUpdateSchema>


export class AuthorityValidator {

    public static create = (obj : object) : boolean => {

        const result = AuthorityInputCreateSchema.safeParse(obj)

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

        const result = AuthorityInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}


