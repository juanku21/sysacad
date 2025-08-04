
import config from "../config/config"
import jsonwebtoken from 'jsonwebtoken'
import { UserJWTPayload } from "../types"


export class JWT {

    public static generate = (id : number, email : string, roles : string[]) : string => {

        return jsonwebtoken.sign(
            {id, email, roles}, 
            config.JWT_SECRET, 
            {expiresIn: '1h'}
        )

    }


    public static verify = (token : string | undefined) : UserJWTPayload | null => {

        if (token) {
            return jsonwebtoken.verify(token, config.JWT_SECRET) as UserJWTPayload
        }
        else{
            return null
        }

    }

}


