
import { Prisma } from "@prisma/client"

export type ClassRoomWithRelations = Prisma.ClassRoomGetPayload<{
    include: {
        subject_dictatios: true,
        final_exams: true
    }
}>