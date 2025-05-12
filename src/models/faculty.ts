
import { Prisma, PrismaClient } from "@prisma/client"
// import prisma from "../config/client" 

export class FacultyModel {

    private prismaClient : PrismaClient

    public constructor(prismaClient : PrismaClient){
        this.prismaClient = prismaClient
    }

    public async getAllFaculties(){
        try {
            const res = this.prismaClient.faculty.findMany()
            return res
        } 
        catch (error) {
            return error    
        }
    }

    public async getFacultyWithId(id : number){
        try {
            const res = this.prismaClient.faculty.findUnique({
                where: {
                    id: id
                }
            })
            return res
        } 
        catch (error) {
            return error    
        }
    }

    public async createFaculty(faculty : Prisma.FacultyCreateInput) {
        try {
            const res = this.prismaClient.faculty.create({
                data: faculty
            })
            return res
        } 
        catch (error) {
            return error    
        }
    }

    public async updateFaculty(id : number , data : object){
        try {
            const res = this.prismaClient.faculty.update({
                where: {
                    id: id
                },
                data: data
            })
            return res
        } 
        catch (error) {
            return error    
        }
    }

    public async deleteFaculty(id : number){
        try {
            const res = this.prismaClient.faculty.delete({
                where: {
                    id: id
                }
            })
            return res
        } 
        catch (error) {
            return error    
        }
    }

}
