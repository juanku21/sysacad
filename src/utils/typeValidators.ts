
import { Prisma } from "@prisma/client"

// Refactorizar después para no repetir código
// Considerar datos opcionales a la hora de validar los create input


export const isUniversityCreateInput = (university : object) : boolean => {

    let result : boolean = true

    const hopeObjet : Prisma.UniversityCreateInput = {
        name: "Universidad Tecnológica Nacional",
        acronym: "UTN"
    }

    if (Object.keys(university).length !== Object.keys(hopeObjet).length) {
        return false
    }


    Object.keys(hopeObjet).forEach(key => {

        if (!(key in university)) {
            result = false
        }
        else{
            if (typeof university[key] !== typeof hopeObjet[key]) {
                result = false
            }
        }

    })

    return result
}


export const isUniversityUpdateInput = (university : object) : boolean => {

    let result : boolean = true

    if (Object.keys(university).length === 0) {
        return false
    }

    const hopeObjet : Prisma.UniversityUpdateInput = {
        name: "Universidad Tecnológica Nacional",
        acronym: "UTN"
    }

    Object.keys(university).forEach(key => {

        if (!(key in hopeObjet)) {
            result = false
        }
        else{
            if (typeof university[key] !== typeof hopeObjet[key]) {
                result = false
            }
        }

    })

    return result

}



