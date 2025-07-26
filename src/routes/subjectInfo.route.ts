
import express from 'express'
import { SubjectInfoController } from '../controllers/subjectInfo.controller'

const subjectInfoRouter = express.Router()

subjectInfoRouter.get('/', SubjectInfoController.get)
subjectInfoRouter.get('/:id', SubjectInfoController.getById)
subjectInfoRouter.post('/', SubjectInfoController.create)
subjectInfoRouter.put('/:id', SubjectInfoController.update)
subjectInfoRouter.patch('/:id', SubjectInfoController.update)
subjectInfoRouter.delete('/:id', SubjectInfoController.delete)

export default subjectInfoRouter