
import express from 'express'
import { PositionController } from '../controllers/position.controller'

const positionRouter = express.Router()

positionRouter.get('/', PositionController.get)
positionRouter.get('/:id', PositionController.getById)
positionRouter.post('/', PositionController.create)
positionRouter.put('/:id', PositionController.update)
positionRouter.patch('/:id', PositionController.update)
positionRouter.delete('/:id', PositionController.delete)

export default positionRouter