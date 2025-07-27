
import express from 'express'
import { CourseRegistrationController } from '../controllers/courseRegistration.controller'

const courseRegistrationRouter = express.Router()

courseRegistrationRouter.get('/', CourseRegistrationController.get)
courseRegistrationRouter.get('/:id', CourseRegistrationController.getById)
courseRegistrationRouter.post('/', CourseRegistrationController.create)
courseRegistrationRouter.put('/:id', CourseRegistrationController.update)
courseRegistrationRouter.patch('/:id', CourseRegistrationController.update)
courseRegistrationRouter.delete('/:id', CourseRegistrationController.delete)

export default courseRegistrationRouter