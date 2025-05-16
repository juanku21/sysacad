
import { Prisma } from "@prisma/client"

export type FacultyWithRelations = Prisma.FacultyGetPayload<{
    include: {
        users: true,
        class_rooms: true,
        educational_offers: true
    }
}>