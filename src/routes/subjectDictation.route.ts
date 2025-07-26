
import express from 'express'
import { SubjectDictationController } from '../controllers/subjectDictation.controller'

const subjectDictationRouter = express.Router()

subjectDictationRouter.get('/', SubjectDictationController.get)
subjectDictationRouter.get('/:id', SubjectDictationController.getById)
subjectDictationRouter.post('/', SubjectDictationController.create)
subjectDictationRouter.put('/:id', SubjectDictationController.update)
subjectDictationRouter.patch('/:id', SubjectDictationController.update)
subjectDictationRouter.delete('/:id', SubjectDictationController.delete)

export default subjectDictationRouter