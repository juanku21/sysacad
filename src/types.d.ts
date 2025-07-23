
import { Prisma } from "@prisma/client"
import { JwtPayload } from "jsonwebtoken"
import { Request } from "express"

// Interfaz del JWT Payload utilizada para usuarios de la API

export interface UserJWTPayload extends JwtPayload {
    id: string | number
    email: string
    roles: string[]
}


// Interdaz de Request con datos propiedades añadidas

export interface AuthRequest extends Request {
    userId: string | number
    userEmail: string
    userRoles: string[]
}

// Interfaz para crear un alumno regular

export interface RegularCertificateInput {
    name: string
    last_name: string
    cuil: number
    file: number
    faculty: string
    university: string
    career: string
    city: string
    date: string
}


// tipos correspondientes a objetos del ORM con sus respectivas relaciones

export type UserWithRelations = Prisma.UserGetPayload<{
    include: {
        student: true,
        authority: {
            include: {
                position: {
                    include: {
                        position: true
                    }
                }
            }    
        }
    }
}>

export type CareerWithRelations = Prisma.CareerGetPayload<{
    include: {
        educationalOffers: true,
        studyPlans: true,
        students: true
    }
}>

export type ClassRoomWithRelations = Prisma.ClassRoomGetPayload<{
    include: {
        subjectDictation: true,
        finalExams: true,
        faculty: true
    }
}>

export type FacultyWithRelations = Prisma.FacultyGetPayload<{
    include: {
        educationalOffers: true,
        university: true,
        city: true
    }
}>

export type FinalExamWithRelations = Prisma.FinalExamGetPayload<{
    include: {
        teacher: {
            include: {
                teacher: {
                    include: {
                        user: true
                    }
                }
            }
        },
        registrations: true,
        subjectInfo: {
            include: {
                subject: true
            }
        }
    }
}>

export type StudyPlanWithRelations = Prisma.StudyPlanGetPayload<{
    include: {
        subjectInfo: {
            include: {
                subject: true
            }
        },
        correlativities: true,
        career: true
    }
}> 


export type SubjectWithRelations = Prisma.SubjectGetPayload<{
    include: {
        correlativities: {
            include: {
                studyPlan: {
                    include: {
                        career: true
                    }
                }
            }
        },
        required: {
            include: {
                studyPlan: {
                    include: {
                        career: true
                    }
                }
            }
        }
    }
}>


export type SubjectInfoWithRelations = Prisma.SubjectInfoGetPayload<{
    include: {
        dictation: true,
        finalExam: true,
        subject: true,
        studyPlan: {
            include: {
                career: true
            }
        }
    }
}>


export type SubjectDictationWithRelations = Prisma.SubjectDictationGetPayload<{
    include: {
        registrations: true,
        teacher: {
            include: {
                teacher: {
                    include: {
                        user: true
                    }
                }
            }
        },
        subjectInfo: true
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
                authority: true
            }
        },
        category: true
    }
}>

export type PositionCategoryWithRelations = Prisma.PositionCategoryGetPayload<{
    include: {
        positions: true
    }
}>


export type StudentWithRelations = Prisma.StudentGetPayload<{
    include: {
        user: {
            include: {
                faculty: {
                    include: {
                        university: true,
                        city: true
                    }
                }
            }
        },
        career: true,
        quealifications: true,
        courseRegistrations: true,
        examRegistrations: true
    }
}>

export type AuthorityWithRelations = Prisma.AuthorityGetPayload<{
    include: {
        user: true,
        finalExam: {
            include: {
                finalExam: true
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

export type CorrelativityWithRelations = Prisma.CorrelativityGetPayload<{
    include: {
        studyPlan: {
            include: {
                career: true
            }
        },
        correlativity: true,
        subject: true
    }
}>