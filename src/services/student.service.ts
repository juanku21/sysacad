
import { Prisma, Student } from "@prisma/client"
import { StudentWithRelations } from "../types"
import { StudentRepository } from "../repositories/student.repository"
import { PDFGenerator } from "../utils/pdf"
import { DOCXGenerator } from "utils/docx"
import { StudentMapper } from "../mapping/student.mapper"
import { Encrypter } from "../utils/encryption"

const repository = new StudentRepository()

export class StudentService {

    public static async get() : Promise<Student[]> {
        try {
            const result = await repository.get()
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener la lista de estudiantes: ${error}`)
        }
    }

    public static async getById(id : number) : Promise<StudentWithRelations | null> {
        try {
            const result = await repository.getById(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener el estudiante solicitado: ${error}`)
        }
    }

    public static async create(student : Prisma.StudentCreateInput) : Promise<Student> {
        try {

            if (student.user.create?.password) {
                student.user.create.password = Encrypter.encode(student.user.create.password)
            }

            const result = await repository.create(student)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible crear una nuevo estudiante: ${error}`)
        }
    }

    public static async update(id : number, student : Prisma.StudentUpdateInput) : Promise<Student | null>  {
        try {
            const studentExists = await repository.getById(id)

            if (studentExists === null) {
                return null    
            }

            if (student.user?.update?.password) {
                student.user.update.password = Encrypter.encode(student.user.update.password.toString())
            }

            const result = await repository.update(id, student)
            return result

        } 
        catch (error : any) {
            throw new Error(`No fue posible actualizar el estudiante solicitado: ${error}`)
        }
    }

    public static async delete(id : number) : Promise<Student | null> {
        try {
            const studentExists = await repository.getById(id)

            if (studentExists === null) {
                return null    
            }

            const result = await repository.delete(id)
            return result
        } 
        catch (error : any) {
            throw new Error(`No fue posible eliminar el estudiante solicitado: ${error}`)
        }

    }

    public static async generateRegularCertificatePDF(id : number) : Promise<Uint8Array | null> {

        try {
            const student = await repository.getById(id)

            if (student === null) {
                return null    
            }

            const studentInput = StudentMapper.fromEntityToCertificateObject(student)

            const certificate = await PDFGenerator.regularCertificate(studentInput)

            return certificate

        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener el certificado solicitado: ${error}`)
        }

    }

    public static async generateRegularCertificateDOCX(id : number) : Promise<Buffer | null> {

        try {
            const student = await repository.getById(id)

            if (student === null) {
                return null    
            }

            const studentInput = StudentMapper.fromEntityToCertificateObject(student)

            const certificate = await DOCXGenerator.regularCertificate(studentInput)

            return certificate

        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener el certificado solicitado: ${error}`)
        }

    }

}