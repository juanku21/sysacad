
import express from 'express'
import { CareerController } from '../controllers/career.controller'

const careerRouter = express.Router()

careerRouter.get('/', CareerController.get)
careerRouter.get('/:id', CareerController.getById)
careerRouter.post('/', CareerController.create)
careerRouter.put('/:id', CareerController.update)
careerRouter.patch('/:id', CareerController.update)
careerRouter.delete('/:id', CareerController.delete)

export default careerRouter