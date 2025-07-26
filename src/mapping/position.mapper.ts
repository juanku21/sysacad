
import { RegularCertificateInput, PositionWithRelations } from "../types"
import { PositionCreateInput, PositionUpdateInput } from "../validators/position.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"
import da from "zod/v4/locales/da.cjs"


export class PositiontMapper {

    public static fromDTOtoEntityCreate = (data : PositionCreateInput) : Prisma.PositionCreateInput => {

        return {
            name: data.name,
            description: data.description,
            puntaje: data.puntaje,
            area: data.area,
            category: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.category_id)
                }
            }
        }

    }


    public static fromDTOtoEntityUpdate = (data : PositionUpdateInput) : Prisma.PositionUpdateInput => {

        const result : Prisma.PositionUpdateInput = {
            name: data.name,
            description: data.description,
            puntaje: data.puntaje,
            area: data.area,
        }

        if (data.category_id) result.category = {connect: {id: IdEncrypter.decodeUUID(data.category_id)}} 

        return result  

    }

}

