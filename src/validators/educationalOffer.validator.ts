

import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"

const EducationalOfferInputCreateSchema = z.object({
    year: z.number().positive().min(1),
    faculty_id: z.string().min(1),
    career_id: z.string().min(1),
    price: z.float64().min(1)
    
}).strict()

const EducationalOfferInputUpdateSchema = z.object({
    year: z.optional(z.number().positive().min(1)),
    faculty_id: z.optional(z.string().min(1)),
    career_id: z.optional(z.string().min(1)),
    price: z.optional(z.float64().min(1))

}).strict()


export type EducationalOfferCreateInput = z.infer<typeof EducationalOfferInputCreateSchema>
export type EducationalOfferUpdateInput = z.infer<typeof EducationalOfferInputUpdateSchema>


export class EducationalOfferValidator {

    public static create = (obj : object) : boolean => {

        const result = EducationalOfferInputCreateSchema.safeParse(obj)

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

        const result = EducationalOfferInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}
