import express from 'express'
import { CorrelativityController } from '../controllers/correlativity.controller'

const correlativityRouter = express.Router()

correlativityRouter.get('/', CorrelativityController.get)
correlativityRouter.get('/:id', CorrelativityController.getById)
correlativityRouter.post('/', CorrelativityController.create)
correlativityRouter.put('/:id', CorrelativityController.update)
correlativityRouter.patch('/:id', CorrelativityController.update)
correlativityRouter.delete('/:id', CorrelativityController.delete)

export default correlativityRouter