

import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const PositionInputCreateSchema = z.object({

    name: z.string().min(1),
    description: z.string().min(1),
    puntaje: z.float64().min(1),
    area: z.string().min(1),
    category_id: z.string().min(1)

}).strict()

const PositionInputUpdateSchema = z.object({

    name: z.optional(z.string().min(1)),
    description: z.optional(z.string().min(1)),
    puntaje: z.optional(z.float64().min(1)),
    area: z.optional(z.string().min(1)),
    category_id: z.optional(z.string().min(1))

}).strict()


export type PositionCreateInput = z.infer<typeof PositionInputCreateSchema>
export type PositionUpdateInput = z.infer<typeof PositionInputUpdateSchema>


export class PositionValidator {

    public static create = (obj : object) : boolean => {

        const result = PositionInputCreateSchema.safeParse(obj)

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

        const result = PositionInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}


