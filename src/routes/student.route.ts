
import express from 'express'
import { StudentController } from '../controllers/student.controller'

const studentRouter = express.Router()

studentRouter.get('/', StudentController.get)
studentRouter.get('/:id', StudentController.getById)
studentRouter.post('/', StudentController.create)
studentRouter.put('/:id', StudentController.update)
studentRouter.patch('/:id', StudentController.update)
studentRouter.delete('/:id', StudentController.delete)

export default studentRouter