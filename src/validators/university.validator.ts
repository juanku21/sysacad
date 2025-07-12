
import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"

const UniversityInputCreateSchema = z.object({
    name: z.string().min(1),
    acronym: z.string().min(1)
}).strict()

const UniversityInputUpdateSchema = z.object({
    name: z.optional(z.string().min(1)),
    acronym: z.optional(z.string().min(1))
}).strict()

type UniversityCreateInput = z.infer<typeof UniversityInputCreateSchema>
type UniversityUpdateInput = z.infer<typeof UniversityInputUpdateSchema>


export class UniversityValidator {

    public static create = (obj : object) : boolean => {

        const result = UniversityInputCreateSchema.safeParse(obj)

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

        const result = UniversityInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}


