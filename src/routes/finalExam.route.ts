
import express from 'express'
import { FinalExamController } from '../controllers/finalExam.controller'

const finalExamRouter = express.Router()

finalExamRouter.get('/', FinalExamController.get)
finalExamRouter.get('/:id', FinalExamController.getById)
finalExamRouter.post('/', FinalExamController.create)
finalExamRouter.put('/:id', FinalExamController.update)
finalExamRouter.patch('/:id', FinalExamController.update)
finalExamRouter.delete('/:id', FinalExamController.delete)

export default finalExamRouter
