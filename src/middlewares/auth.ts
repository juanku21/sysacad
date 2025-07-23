
import { JWT } from '../utils/jwt'
import { UserService } from '../services/user.service'
import { Response, NextFunction } from 'express'
import { AuthRequest } from '../types'

export class Auth {

    public static verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {

        const token = req.header('Authorization')?.replace('Bearer ', '')

        if (!token) res.status(401).json({message: 'Token de autenticación requerido'})
        
        try {
            const decode = JWT.verify(token)

            let user : object | null

            if (decode) {

                user = await UserService.getByEmail(decode.email)

                if (!user) res.status(404).json({message: 'Usuario no encontrado'})

                req.userId = decode.id
                req.userEmail = decode.email
                req.userRoles = decode.roles

                next()
            } 
            else {
                user = null
                res.status(401).json({message: 'Token de autenticación inválido'})
            }

        } 
        catch (error : any) {
            res.status(503).json({error: 'Fallo de autenticación'})
        }

    }

}