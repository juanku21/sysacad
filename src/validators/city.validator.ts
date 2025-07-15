

import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"

const CityInputCreateSchema = z.object({
    name: z.string().min(1),
    zip_code: z.string().min(1)
}).strict()

const CityInputUpdateSchema = z.object({
    name: z.optional(z.string().min(1)),
    zip_code: z.optional(z.string().min(1))
}).strict()


type CityCreateInput = z.infer<typeof CityInputCreateSchema>
type CityUpdateInput = z.infer<typeof CityInputUpdateSchema>


export class CityValidator {

    public static create = (obj : object) : boolean => {

        const result = CityInputCreateSchema.safeParse(obj)

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

        const result = CityInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}


