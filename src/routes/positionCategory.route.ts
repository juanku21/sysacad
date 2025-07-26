
import express from 'express'
import { PositionCategoryController } from '../controllers/positionCategory.controller'

const positionCategoryRouter = express.Router()

positionCategoryRouter.get('/', PositionCategoryController.get)
positionCategoryRouter.get('/:id', PositionCategoryController.getById)
positionCategoryRouter.post('/', PositionCategoryController.create)
positionCategoryRouter.put('/:id', PositionCategoryController.update)
positionCategoryRouter.patch('/:id', PositionCategoryController.update)
positionCategoryRouter.delete('/:id', PositionCategoryController.delete)

export default positionCategoryRouter