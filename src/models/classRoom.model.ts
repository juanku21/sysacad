
import { Prisma } from "@prisma/client"

export type ClassRoomWithRelation = Prisma.ClassRoomGetPayload<{
    include: {
        subject_dictatios: true,
        final_exams: true
    }
}>