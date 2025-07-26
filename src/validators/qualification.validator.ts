
import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const QualificationInputCreateSchema = z.object({
    value: z.number().positive().min(1),
    student_id: z.string().min(1),
    subject_id: z.string().min(1)

}).strict()

const QualificationInputUpdateSchema = z.object({

    value: z.optional(z.number().positive().min(1)),
    student_id: z.optional(z.string().min(1)),
    subject_id: z.optional(z.string().min(1))

}).strict()


export type QualificationCreateInput = z.infer<typeof QualificationInputCreateSchema>
export type QualificationUpdateInput = z.infer<typeof QualificationInputUpdateSchema>


export class QualificationValidator {

    public static create = (obj : object) : boolean => {

        const result = QualificationInputCreateSchema.safeParse(obj)

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

        const result = QualificationInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}