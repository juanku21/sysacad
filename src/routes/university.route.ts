
import express from 'express'
import { UniversityController } from '../controllers/university.controller'
import { Auth } from '../middlewares/auth'

const universityRouter = express.Router()

universityRouter.get('/', Auth.verifyToken, Auth.verifyRole(['Owner', 'Student']), UniversityController.get)
universityRouter.get('/:id', UniversityController.getById)
universityRouter.post('/', UniversityController.create)
universityRouter.put('/:id', UniversityController.update)
universityRouter.patch('/:id', UniversityController.update)
universityRouter.delete('/:id', UniversityController.delete)

export default universityRouter