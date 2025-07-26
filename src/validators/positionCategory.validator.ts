

import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const PositionCategoryInputCreateSchema = z.object({

    name: z.literal(["Teacher", "Employee", "Administrator", "Owner"]),
    description: z.string().min(1)

}).strict()

const PositionCategoryInputUpdateSchema = z.object({

    name: z.optional(z.literal(["Teacher", "Employee", "Administrator", "Owner"]),),
    description: z.optional(z.string().min(1))

}).strict()


export type PositionCategoryCreateInput = z.infer<typeof PositionCategoryInputCreateSchema>
export type PositionCategoryUpdateInput = z.infer<typeof PositionCategoryInputUpdateSchema>


export class PositionCategoryValidator {

    public static create = (obj : object) : boolean => {

        const result = PositionCategoryInputCreateSchema.safeParse(obj)

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

        const result = PositionCategoryInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}

