
import { Prisma } from "@prisma/client";

export type CareerWithRelations = Prisma.CareerGetPayload<{
    include: {
        educational_offers: true,
        study_plans: true,
        students: true
    }
}>