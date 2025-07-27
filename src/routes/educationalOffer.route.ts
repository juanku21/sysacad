
import express from 'express'
import { EducationalOfferController } from '../controllers/educationalOffer.controller'

const educationalOfferRouter = express.Router()

educationalOfferRouter.get('/', EducationalOfferController.get)
educationalOfferRouter.get('/:id', EducationalOfferController.getById)
educationalOfferRouter.post('/', EducationalOfferController.create)
educationalOfferRouter.put('/:id', EducationalOfferController.update)
educationalOfferRouter.patch('/:id', EducationalOfferController.update)
educationalOfferRouter.delete('/:id', EducationalOfferController.delete)

export default educationalOfferRouter
