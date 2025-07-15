
import express from 'express'
import { FacultyController } from '../controllers/faculty.controller'

const facultyRouter = express.Router()

facultyRouter.get('/', FacultyController.get)
facultyRouter.get('/:id', FacultyController.getById)
facultyRouter.post('/', FacultyController.create)
facultyRouter.put('/:id', FacultyController.update)
facultyRouter.patch('/:id', FacultyController.update)
facultyRouter.delete('/:id', FacultyController.delete)

export default facultyRouter