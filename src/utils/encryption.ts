
import Sqids from "sqids"
import bcrypt from "bcrypt"
import config from "../config/config"

// Generar IDs aleatorios para no exponer IDs enteros y sencuenciales en el cliente

const sqidsPK = new Sqids({
    alphabet: config.squids.alphabet,
    minLength: config.squids.minLength,
})


export class IdEncrypter {

    public static decodeUUID = (uuid : string) : number => {

        try {
            const result = sqidsPK.decode(uuid)[0]
            return result
        } 
        catch (error : any) {
            throw new Error(`Fallo de decodificación de ID`)
        }

    }

    public static encodeData = (data : object) : object => {

        try {

            Object.keys(data).map(key => {

                let atribut = data[key] 

                if (typeof atribut === 'number') {
                    
                    if (key.includes('id') || key.includes('Id') || key.includes('ID')) data[key] = sqidsPK.encode([atribut])

                }
                else if (typeof atribut === 'object' && atribut !== null) (
                    this.encodeData(data[key])
                )

            })

            return data

        } 
        catch (error : any) {
            throw new Error(`Fallo de codificación de respuesta`)
        }

    }

}



export class Encrypter {

    public static encode = (plain : string) : string => {
        
        try{
            const salt = bcrypt.genSaltSync()
            const hashed = bcrypt.hashSync(plain, salt)
            return hashed
        }
        catch (error : any) {
            throw new Error("Fallo de encriptación")
        }
    }

    public static compare = (value : string, other : string) : boolean => {

        try {
            const result = bcrypt.compareSync(value, other)
            return result
        } 
        catch (error : any) {
            throw new Error("Fallo de comparación de valores encriptados")
        }

    } 

}

