

export const dateObjectTransformer = (elementWithDate : object | Array<object>) => {

    if (elementWithDate instanceof Array) {

        let newObjectArray : Array<object | undefined> = []
        newObjectArray = elementWithDate.map(element => dateObjectTransformer(element))

        return newObjectArray
    
    }
    else{
        
        const newObjectWithDate : object = {}

        Object.keys(elementWithDate).forEach(key => {

            const atribut = elementWithDate[key]

            if (atribut instanceof Date) {
                newObjectWithDate[key] = atribut.toISOString()
            }
            else if (atribut instanceof Array) {
                newObjectWithDate[key] = atribut.map(element => dateObjectTransformer(element))
            }
            else if(atribut instanceof Object) {
                newObjectWithDate[key] = dateObjectTransformer(atribut)
            }
            else{
                newObjectWithDate[key] = atribut
            }

        })

        return newObjectWithDate

    }

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

