

import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const ClassRoomInputCreateSchema = z.object({

    name: z.string().min(1),
    code: z.number().positive().min(1),
    capacity: z.number().positive().min(1),
    projector: z.boolean(),
    board: z.boolean(),
    air_conditioning: z.boolean(),
    heating: z.boolean(),
    wifi: z.boolean(),
    faculty_id: z.string().min(1),

}).strict()

const ClassRoomInputUpdateSchema = z.object({

    name: z.optional(z.string().min(1)),
    code: z.optional(z.number().positive().min(1)),
    capacity: z.optional(z.number().positive().min(1)),
    projector: z.optional(z.boolean()),
    board: z.optional(z.boolean()),
    air_conditioning: z.optional(z.boolean()),
    heating: z.optional(z.boolean()),
    wifi: z.optional(z.boolean()),
    faculty_id: z.optional(z.string().min(1)),

}).strict()


export type ClassRoomCreateInput = z.infer<typeof ClassRoomInputCreateSchema>
export type ClassRoomUpdateInput = z.infer<typeof ClassRoomInputUpdateSchema>


export class ClassRoomValidator {

    public static create = (obj : object) : boolean => {

        const result = ClassRoomInputCreateSchema.safeParse(obj)

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

        const result = ClassRoomInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}

