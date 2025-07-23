

import { Request, Response, RequestHandler } from "express"
import { UserService } from "../services/user.service"
import { AuthValidator } from "../validators/auth.validator"
import { JWT } from "../utils/jwt"

export class AuthController {

    public static login : RequestHandler = async (req : Request, res : Response) => {
        
        if (!AuthValidator.login(req.body)) res.status(400).json({error: "Los datos enviados son incorrectos"})

        const { email, password } = req.body

        try {

            const user = await UserService.authenticate(email, password)
                
            const roles : string[] = await UserService.authorize(user)

            const token = JWT.generate(user.id, user.email, roles)

            res.status(200).json({token: token})

        } 
        catch (error : any) {

            if (error.message === 'Fallo de autenticación: El usuario con el email proporcionado no existe') {
                res.status(404).json({error: `${error.message}`})
            }
            else if (error.message === 'Fallo de autenticación: La contraseña proporcionada es incorrecta') {
                res.status(401).json({error: `${error.message}`})
            }
            else{
                res.status(503).json({error: `${error.message}`})
            }

        }

    }  

}