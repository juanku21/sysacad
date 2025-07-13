
import Sqids from "sqids"
import { merge } from "./objectFunctions"
import type { ServiceData } from "../types"

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

    public static encodeData = (data : ServiceData) : object => {

        const {id, ...otherData} = data

        const secureObject = merge({id: sqidsPK.encode([id])}, otherData)

        return secureObject

    }

}
