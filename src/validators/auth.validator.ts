
import * as z from "zod"


const LoginSchema = z.object({

    email: z.email(),
    password: z.string().min(8)

}).strict()


export type LoginInput = z.infer<typeof LoginSchema>


export class AuthValidator {

    public static login = (obj : object) : boolean => {

        const result = LoginSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}

