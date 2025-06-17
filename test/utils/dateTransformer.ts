

export const dateObjectTransformer = (objectWithDate : object) => {

    const newObjectWithDate : object = {}

    Object.keys(objectWithDate).forEach(key => {

        const atribut = objectWithDate[key]

        if (atribut instanceof Date) {
            newObjectWithDate[key] = atribut.toISOString()
        }
        else if (atribut instanceof Array) {
            newObjectWithDate[key] = dateObjectArrayTransformer(atribut)
        }
        else{
            newObjectWithDate[key] = atribut
        }

    })

    return newObjectWithDate

}

export const dateObjectArrayTransformer = (objectArrayWithDate : object[]) => {

    let newObjectArray : Array<object> = []
    let newObjectWithDate : object

    objectArrayWithDate.forEach(record => {

        newObjectWithDate = {}

        Object.keys(record).forEach(key => {

            const atribut = record[key]

            if (atribut instanceof Date) {
                newObjectWithDate[key] = atribut.toISOString()
            }
            else{
                newObjectWithDate[key] = atribut
            }

        })

        newObjectArray.push(newObjectWithDate)
    })

    return newObjectArray

}

