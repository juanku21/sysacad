
import { Prisma } from "@prisma/client"

export type SubjectWithRelations = Prisma.SubjectGetPayload<{
    include: {
        assignments: true,
        correlativities: true,
        quealifications: true,
        required: true
    }
}>