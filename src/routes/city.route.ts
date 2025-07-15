
import express from 'express'
import { CityController } from '../controllers/city.controller'

const cityRouter = express.Router()

cityRouter.get('/', CityController.get)
cityRouter.get('/:id', CityController.getById)
cityRouter.post('/', CityController.create)
cityRouter.put('/:id', CityController.update)
cityRouter.patch('/:id', CityController.update)
cityRouter.delete('/:id', CityController.delete)

export default cityRouter