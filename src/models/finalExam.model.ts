
import { Prisma } from "@prisma/client"

export type FinalExamWithRelations = Prisma.FinalExamGetPayload<{
    include: {
        assignments: true,
        registrations: true
    }
}>