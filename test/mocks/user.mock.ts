
import { User } from "@prisma/client"

export const user : User = {
    id: 1,
    name: "Tomi",
    last_name: "Montes",
    email: "tomimo@mail.com",
    password: "camicami123",
    cuil: 2044444447,
    phone: 2608127127,
    gender: 'F',
    facultyId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
}