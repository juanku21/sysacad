
import { PrismaOrder, IRawOrder } from "../types"

export class PrismaOrderByTransformer {

    public static toPrismaOrderBy(jsonString: string): PrismaOrder[] {
        
        if (!jsonString) {
            return []
        }

        let rawOrders: IRawOrder[]

        
        try {
            rawOrders = JSON.parse(jsonString);
        } 
        catch (e) {
            throw new Error('El parámetro de ordenamiento no es un JSON válido.')
        }

        if (!Array.isArray(rawOrders)) {
            throw new Error('El JSON de ordenamiento debe ser un array.')
        }

        const orderByArray: PrismaOrder[] = []

        
        for (const rawOrder of rawOrders) {
            
            if (typeof rawOrder.field !== 'string' || typeof rawOrder.order !== 'string') {
                throw new Error('Cada objeto de ordenamiento debe contener un "field" (string) y un "order" (string).')
            }

            const orderValue = rawOrder.order.toLowerCase();
            
            if (orderValue !== 'asc' && orderValue !== 'desc') {
                throw new Error(`Dirección de ordenamiento '${rawOrder.order}' no válida. Use 'asc' o 'desc'.`)
            }

            orderByArray.push({
                [rawOrder.field]: orderValue,
            } as PrismaOrder)
        }

        return orderByArray
    }
}

