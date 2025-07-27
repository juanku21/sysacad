

import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const CourseRegistrationInputCreateSchema = z.object({

    state: z.literal(["Irregular", "Regular", "Aprroved", "Attending"]),
    student_id: z.string().min(1),
    dictation_id: z.string()    

}).strict()

const CourseRegistrationInputUpdateSchema = z.object({

    state: z.optional(z.literal(["Irregular", "Regular", "Aprroved", "Attending"])),
    student_id: z.optional(z.string().min(1)),
    dictation_id: z.optional(z.string())

}).strict()


export type CourseRegistrationCreateInput = z.infer<typeof CourseRegistrationInputCreateSchema>
export type CourseRegistrationUpdateInput = z.infer<typeof CourseRegistrationInputUpdateSchema>


export class CourseRegistrationValidator {

    public static create = (obj : object) : boolean => {

        const result = CourseRegistrationInputCreateSchema.safeParse(obj)

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

        const result = CourseRegistrationInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}

