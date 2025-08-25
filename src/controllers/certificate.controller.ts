

import { Request, Response, RequestHandler } from "express"
import { StudentService } from "../services/student.service"
import { IdEncrypter } from "../utils/encryption"


export class CertificateController {

    public static getPDFByStudentId : RequestHandler = async (req : Request, res : Response) => {

        const id = IdEncrypter.decodeUUID(req.params.id)

        try {
            const result = await StudentService.generateRegularCertificatePDF(id)

            if (result === null) {
                throw new Error('El recurso con el ID solicitado no existe')
            }

            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `inline; filename="certificado_alumno_regular_${req.params.id}.pdf"`)
            
            res.status(200).send(result)

        }
        catch (error : any) {

            if (error.message === 'El recurso con el ID solicitado no existe') {
                res.status(404).json({error: `${error.message}`})
            }
            else{
                res.status(503).json({error: `${error.message}`})
            }

        }
    }

    public static getODTByStudentId : RequestHandler = async (req : Request, res : Response) => {

        const id = IdEncrypter.decodeUUID(req.params.id)

        try {
            const result = await StudentService.generateRegularCertificateDOCX(id)

            if (result === null) {
                throw new Error('El recurso con el ID solicitado no existe')
            }

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            res.setHeader('Content-Disposition', 'attachment; filename=certificado.docx')
            
            res.status(200).send(result)

        }
        catch (error : any) {

            if (error.message === 'El recurso con el ID solicitado no existe') {
                res.status(404).json({error: `${error.message}`})
            }
            else{
                res.status(503).json({error: `${error.message}`})
            }

        }
    }


}