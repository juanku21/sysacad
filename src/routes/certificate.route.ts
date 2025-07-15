
import express from 'express'
import { CertificateController } from '../controllers/certificate.controller'

const certifcateRouter = express.Router()

certifcateRouter.get('/:id/pdf', CertificateController.getPDFByStudentId)

export default certifcateRouter