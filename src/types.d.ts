
import { Prisma } from "@prisma/client";


export type CareerWithRelations = Prisma.CareerGetPayload<{
    include: {
        educational_offers: true,
        study_plans: true,
        students: true
    }
}>

export type ClassRoomWithRelations = Prisma.ClassRoomGetPayload<{
    include: {
        subject_dictatios: true,
        final_exams: true
    }
}>

export type FacultyWithRelations = Prisma.FacultyGetPayload<{
    include: {
        educational_offers: true,
        university: true,
        city: true
    }
}>

export type FinalExamWithRelations = Prisma.FinalExamGetPayload<{
    include: {
        teacher: {
            include: {
                teacher: true
            }
        },
        registrations: true,
        subject: {
            include: {
                subject: true
            }
        }
    }
}>

export type StudyPlanWithRelations = Prisma.StudyPlanGetPayload<{
    include: {
        subject_assignments: {
            include: {
                subject: true
            }
        },
        correlativities: true
    }
}> 


export type SubjectWithRelations = Prisma.SubjectGetPayload<{
    include: {
        correlativities: {
            include: {
                study_plan: {
                    include: {
                        career: true
                    }
                }
            }
        },
        required: {
            include: {
                study_plan: {
                    include: {
                        career: true
                    }
                }
            }
        }
    }
}>


export type SubjectDictationWithRelations = Prisma.SubjectDictationGetPayload<{
    include: {
        registrations: true,
        assigments: true
    }
}>

export type CityWithRelations = Prisma.CityGetPayload<{
    include: {
        faculty: true
    }
}>


export type UniversityWithRelations = Prisma.UniversityGetPayload<{
    include: {
        faculty: true
    }
}>

export type PositionWithRelations = Prisma.PositionGetPayload<{
    include: {
        authority: {
            include: {
                authority: {
                    true
                }
            }
        }
    }
}>

export type PositionCategoryWithRelations = Prisma.PositionCategoryGetPayload<{
    include: {
        positions: true
    }
}>


export type StudentWithRelations = Prisma.StudentGetPayload<{
    include: {
        user: true,
        quealifications: true,
        course_registrations: true,
        exam_registrations: true
    }
}>

export type AuthorityWithRelations = Prisma.AuthorityGetPayload<{
    include: {
        user: true,
        final_exam: {
            include: {
                final_exam: true
            }
        },
        dictation: {
            include: {
                dictation: true
            }
        },
        position: {
            include: {
                position: true
            }
        }
    }
}>

export type EducationalOfferWithRelations = Prisma.EducationalOfferGetPayload<{
    include: {
        career: true
    }
}>

export type CourseRegistrationWithRelations = Prisma.CourseRegistrationGetPayload<{
    include: {
        student: {
            include: {
                user: true
            }
        },
        dictation: true
    }
}>


export type FinalExamRegistrationWithRelations = Prisma.FinalExamRegistrationGetPayload<{
    include: {
        student: {
            include: {
                user: true
            }
        },
        exam: true
    }
}>


