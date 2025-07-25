

import express from 'express'
import { AuthorityController } from '../controllers/authority.controller'

const authorityRouter = express.Router()

authorityRouter.get('/', AuthorityController.get)
authorityRouter.get('/:id', AuthorityController.getById)
authorityRouter.post('/', AuthorityController.create)
authorityRouter.put('/:id', AuthorityController.update)
authorityRouter.patch('/:id', AuthorityController.update)
authorityRouter.delete('/:id', AuthorityController.delete)

export default authorityRouter