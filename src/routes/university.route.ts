
import express from 'express'
import { UniversityController } from '../controllers/university.controller'
import { Auth } from '../middlewares/auth'

const universityRouter = express.Router()

universityRouter.get('/', Auth.verifyToken, Auth.verifyRole(['Owner', 'Student']), UniversityController.get)
universityRouter.get('/:id', Auth.verifyToken, Auth.verifyRole(['Owner', 'Student']), UniversityController.getById)
universityRouter.post('/', Auth.verifyToken, Auth.verifyRole(['Owner']), UniversityController.create)
universityRouter.put('/:id', Auth.verifyToken, Auth.verifyRole(['Owner']), UniversityController.update)
universityRouter.patch('/:id', Auth.verifyToken, Auth.verifyRole(['Owner']), UniversityController.update)
universityRouter.delete('/:id', Auth.verifyToken, Auth.verifyRole(['Owner']), UniversityController.delete)

export default universityRouter