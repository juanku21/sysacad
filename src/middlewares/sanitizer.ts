
import xss from 'xss'
import { Request, Response, NextFunction } from 'express'


const isInfected = (value : string | string[] | undefined) : boolean => {
    
    let result : boolean 

    if (typeof value === 'string') {

        const sanitized : string = xss(value)
        value !== sanitized ? result = true : result = false 

    }
    else if (typeof value === 'undefined') {
        result = false
    }
    else{

        let sanitized : string
        result = false

        for (let i = 0; i < value.length; i++) {
            sanitized = xss(value[i])
        
            if (sanitized !== value[i]) {
                result = true
                break
            }
        }

    }

    return result
}


export class Sanitizer {

    public static xss = async (req : Request, res : Response, next : NextFunction) => {

        const {query, body, ip, headers} = req

        const toAnalyze = [query, body, ip, headers] 

        try {

            toAnalyze.map(element => {

                if (typeof element === 'object') {
                    
                    Object.keys(element).forEach(key => {

                        const value : string | string[] | undefined = element[key]

                        if (isInfected(value)) {
                            throw new Error(`Usted está intentando realizar un ataque XSS desde la dirección ${ip}. La policía llegará a su casa en instantes`)
                        }

                    })

                }
                else if (typeof element === 'string') {

                    if (isInfected(element)) {
                        throw new Error(`Usted está intentado realizar un ataque XSS mediante falsificación de su dirección IP`)
                    }

                }

            })

            next()
            
        } 
        catch (error : any) {

            if (error.message) {
                res.status(400).json({error: error.message})
            }

        }
    }

}

