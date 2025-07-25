
import express from 'express'
import { SubjectController } from '../controllers/subject.controller'

const subjectRouter = express.Router()

subjectRouter.get('/', SubjectController.get)
subjectRouter.get('/:id', SubjectController.getById)
subjectRouter.post('/', SubjectController.create)
subjectRouter.put('/:id', SubjectController.update)
subjectRouter.patch('/:id', SubjectController.update)
subjectRouter.delete('/:id', SubjectController.delete)

export default subjectRouter