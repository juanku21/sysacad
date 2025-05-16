
import { Prisma } from "@prisma/client"

export type StudyPlanWithRelations = Prisma.StudyPlanGetPayload<{
    include: {
        subject_assignments: true,
        correlativities: true
    }
}> 