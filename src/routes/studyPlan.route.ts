
import express from 'express'
import { StudyPlanController } from '../controllers/studyPlan.controller'

const studyPlanRouter = express.Router()

studyPlanRouter.get('/', StudyPlanController.get)
studyPlanRouter.get('/:id', StudyPlanController.getById)
studyPlanRouter.post('/', StudyPlanController.create)
studyPlanRouter.put('/:id', StudyPlanController.update)
studyPlanRouter.patch('/:id', StudyPlanController.update)
studyPlanRouter.delete('/:id', StudyPlanController.delete)

export default studyPlanRouter