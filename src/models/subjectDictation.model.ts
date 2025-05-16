
import { Prisma } from "@prisma/client"

export type SubjectDictationWithRelations = Prisma.SubjectDictationGetPayload<{
    include: {
        registrations: true,
        assigments: true
    }
}>