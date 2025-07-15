

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
