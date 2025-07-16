
import Sqids from "sqids"
import bcrypt from "bcrypt"

// Generar IDs aleatorios para no exponer IDs enteros y sencuenciales en el cliente

const sqidsPK = new Sqids({
    alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%$!-',
    minLength: 10, 
})


export class IdEncrypter {

    public static decodeUUID = (uuid : string) : number => {

        const result = sqidsPK.decode(uuid)[0]
        return result

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

    public static encode = async (plain : string) : Promise<string> => {
        
        try{
            const hashed = bcrypt.hash(plain, 10)
            return hashed
        }
        catch (error : any) {
            throw new Error("Fallo de encriptación")
        }
    }

    public static compare = async (value : string, other : string) : Promise<boolean> => {

        try {
            const result = await bcrypt.compare(value, other)
            return result
        } 
        catch (error : any) {
            throw new Error("Fallo de comparación de valores encriptados")
        }

    } 

}