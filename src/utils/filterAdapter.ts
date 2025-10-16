

import { IRawFilter, IClientFilter } from "types"


const ClientOperatorMap: Record<string, IClientFilter['operator']> = {
    'eq': 'eq',
    'neq': 'neq',
    'gt': 'gt',
    'lt': 'lt',
    'gte': 'gte',
    'lte': 'lte',
    'contains': 'contains',
    'starts': 'startsWith',
    'ends': 'endsWith',
    'in': 'in',
    'not in': 'notIn',
    'is': 'is',
}


const PrismaOperatorsMap = {
    eq: 'equals', 
    neq: 'not', 
    gt: 'gt', 
    lt: 'lt', 
    gte: 'gte', 
    lte: 'lte', 
    contains: 'contains', 
    startsWith: 'startsWith', 
    endsWith: 'endsWith', 
    in: 'in', 
    notIn: 'notIn', 
    is: 'is', 
}


export class PrismaFilterTransformer {

    public static toPrismaWhere(jsonString: string): Record<string, any> {

        const clientFilters = this.parseClientFilters(jsonString)

        return this.mapFiltersToWhere(clientFilters)
    }


     private static parseClientFilters(jsonString: string): IClientFilter[] {
        if (!jsonString) {
            return []
        }

        let rawFilters: IRawFilter[]

        try {
            rawFilters = JSON.parse(jsonString)
        } 
        catch (error) {
            throw new Error('El parámetro de filtros no es un JSON válido.')
        }

        if (!Array.isArray(rawFilters)) {
            throw new Error('El JSON de filtros debe ser un array.')
        }

        const clientFilters: IClientFilter[] = []

        for (const rawFilter of rawFilters) {
            
            if (typeof rawFilter.field !== 'string' || typeof rawFilter.op !== 'string') {
                throw new Error('Cada filtro debe contener un "field" (string) y un "op" (string).')
            }

            const operator = ClientOperatorMap[rawFilter.op.toLowerCase()]

            if (!operator) {
                throw new Error(`Operador '${rawFilter.op}' no reconocido.`)
            }

            if (rawFilter.value === undefined) {
                throw new Error(`El campo '${rawFilter.field}' debe tener un valor.`)
            }

            // Convertir el valor si es un número
            const parsedValue = this.parseNumericValue(rawFilter.value)

            clientFilters.push({
                field: rawFilter.field,
                value: parsedValue,
                operator: operator,
            })
        }

        return clientFilters
    }


    private static parseNumericValue(value: any): any {

        if (typeof value !== 'string') {
            return value
        }

        if (/^\d+$/.test(value)) {
            return parseInt(value, 10)
        }

        if (/^\d*\.\d+$/.test(value)) {
            return parseFloat(value)
        }

        return value
    }


    private static mapFiltersToWhere(clientFilters: IClientFilter[]): Record<string, any> {
        if (clientFilters.length === 0) {
            return {}
        }

        const conditions: Record<string, any>[] = []

        for (const filter of clientFilters) {
            const { field, value, operator } = filter
            
            const prismaOperator = PrismaOperatorsMap[operator];

            const condition: Record<string, any> = {
                [field]: {
                    [prismaOperator]: value,
                }
            }
            

            if (['contains', 'startsWith', 'endsWith'].includes(operator)) {
                condition[field].mode = 'insensitive'
            }

            conditions.push(condition)
        }


        if (conditions.length === 1) {
             return conditions[0]
        }

        return {
            AND: conditions,
        }
    }
}

