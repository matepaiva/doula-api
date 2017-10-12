import { Router } from 'express'
import jwtValidator from 'express-jwt'
import errors from 'throw.js'

import * as controllers from './controllers'

const { JWT_SECRET } = process.env

const routes = Router()

routes.use(jwtValidator({ secret: JWT_SECRET }).unless({ path: [
  '/token'
] }))
routes.use((err, req, res, next) => err.name === 'UnauthorizedError' && next(new errors.Unauthorized()))

routes.get('/', controllers.root.get)
routes.get('/token', controllers.root.authenticate)
routes.get('/list', controllers.list.get)


export default routes
