
import express from 'express'
import { UniversityController } from '../controllers/university.controller'

const universityRouter = express.Router()

universityRouter.get('/', UniversityController.get)
universityRouter.get('/:id', UniversityController.getById)
universityRouter.post('/', UniversityController.create)
universityRouter.patch('/:id', UniversityController.update)
universityRouter.delete('/:id', UniversityController.delete)

export default universityRouter