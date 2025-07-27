
import express from 'express'
import { ClassRoomController } from '../controllers/classRoom.controller'

const classRoomRouter = express.Router()

classRoomRouter.get('/', ClassRoomController.get)
classRoomRouter.get('/:id', ClassRoomController.getById)
classRoomRouter.post('/', ClassRoomController.create)
classRoomRouter.put('/:id', ClassRoomController.update)
classRoomRouter.patch('/:id', ClassRoomController.update)
classRoomRouter.delete('/:id', ClassRoomController.delete)

export default classRoomRouter