
import express from 'express'
import { FinalExamRegistrationController } from '../controllers/finalExamRegistration.controller'

const finalExamRegistrationRouter = express.Router()

finalExamRegistrationRouter.get('/', FinalExamRegistrationController.get)
finalExamRegistrationRouter.get('/:id', FinalExamRegistrationController.getById)
finalExamRegistrationRouter.post('/', FinalExamRegistrationController.create)
finalExamRegistrationRouter.put('/:id', FinalExamRegistrationController.update)
finalExamRegistrationRouter.patch('/:id', FinalExamRegistrationController.update)
finalExamRegistrationRouter.delete('/:id', FinalExamRegistrationController.delete)

export default finalExamRegistrationRouter
