import { Router } from 'express'

import * as controllers from './controllers'

const routes = Router()

routes.get('/', controllers.root.get)
routes.get('/list', controllers.list.get)

export default routes
