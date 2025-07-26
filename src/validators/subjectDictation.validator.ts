
import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const SubjectDictatiocInputCreateSchema = z.object({
    year: z.number().positive().min(1),
    subject_info_id: z.string().min(1),
    classroom_id: z.string().min(1)

}).strict()

const SubjectDictationInputUpdateSchema = z.object({

    year: z.optional(z.number().positive().min(1)),
    subject_info_id: z.optional(z.string().min(1)),
    classroom_id: z.optional(z.string().min(1))

}).strict()


export type SubjectDictatiocCreateInput = z.infer<typeof SubjectDictatiocInputCreateSchema>
export type SubjectDictationUpdateInput = z.infer<typeof SubjectDictationInputUpdateSchema>


export class SubjectDictationValidator {

    public static create = (obj : object) : boolean => {

        const result = SubjectDictatiocInputCreateSchema.safeParse(obj)

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

        const result = SubjectDictationInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}