
import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const CareerInputCreateSchema = z.object({

    name: z.string().min(1),
    code: z.number().positive().min(1),
    description: z.string().min(1),
    level: z.literal(["Course", "Engineering", "Postgraduate", "Technicality", "Degree", "Doctorate"])

}).strict()

const CareerInputUpdateSchema = z.object({

    name: z.optional(z.string().min(1)),
    code: z.optional(z.number().positive().min(1)),
    description: z.optional(z.string().min(1)),
    level: z.optional(z.literal(["Course", "Engineering", "Postgraduate", "Technicality", "Degree", "Doctorate"]))

}).strict()


export type CareerCreateInput = z.infer<typeof CareerInputCreateSchema>
export type CareerUpdateInput = z.infer<typeof CareerInputUpdateSchema>


export class CareerValidator {

    public static create = (obj : object) : boolean => {

        const result = CareerInputCreateSchema.safeParse(obj)

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

        const result = CareerInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}


