import express from 'express'
import { QualificationController } from '../controllers/qualification.controller'

const qualificationRouter = express.Router()

qualificationRouter.get('/', QualificationController.get)
qualificationRouter.get('/:id', QualificationController.getById)
qualificationRouter.post('/', QualificationController.create)
qualificationRouter.put('/:id', QualificationController.update)
qualificationRouter.patch('/:id', QualificationController.update)
qualificationRouter.delete('/:id', QualificationController.delete)

export default qualificationRouter