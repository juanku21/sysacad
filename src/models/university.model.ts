
import { Prisma } from "@prisma/client";

export type UniversityWithRelations = Prisma.UniversityGetPayload<{
    include: {
        faculty: true
    }
}>