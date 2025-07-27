
import { RegularCertificateInput, ClassRoomWithRelations } from "../types"
import { ClassRoomCreateInput, ClassRoomUpdateInput } from "../validators/classRoom.validator"
import { Prisma } from "@prisma/client"
import { IdEncrypter } from "../utils/encryption"
import { connect } from "http2"


export class ClassRoomMapper {

    public static fromDTOtoEntityCreate = (data : ClassRoomCreateInput) : Prisma.ClassRoomCreateInput => {

        return {
            name: data.name,
            code: data.code,
            capacity: data.capacity,
            projector: data.projector,
            board: data.board,
            air_conditioning: data.air_conditioning,
            heating: data.heating,
            wifi: data.wifi,
            faculty: {
                connect: {
                    id: IdEncrypter.decodeUUID(data.faculty_id)
                }
            },
        }

    }


    public static fromDTOtoEntityUpdate = (data : ClassRoomUpdateInput) : Prisma.ClassRoomUpdateInput => {

        const result : Prisma.ClassRoomUpdateInput = {
            name: data.name,
            code: data.code,
            capacity: data.capacity,
            projector: data.projector,
            board: data.board,
            air_conditioning: data.air_conditioning,
            heating: data.heating,
            wifi: data.wifi,
        }

        if (data.faculty_id && result.faculty) result.faculty = {connect: {id: IdEncrypter.decodeUUID(data.faculty_id)}}
        return result  

    }

}

