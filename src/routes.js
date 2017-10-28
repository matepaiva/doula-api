// #region NODE_MODULES IMPORT
import { Router } from 'express'
import jwtValidator from 'express-jwt'
import errors from 'throw.js'
import google from 'googleapis'
// #endregion

// #region LOCAL IMPORT
import * as controllers from './controllers'
import noop from './utils/noop'
import { requiredParams } from './controllers/root/root.controller'
// #endregion

// #region GLOBAL CONSTANTS
const { JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env
const plus = google.plus('v1')
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, '')
// #endregion

// #region Creating instances of Router() to create public and private routes
const routes = Router()
const publicRoutes = Router()
const privateRoutes = Router()
// #endregion

// #region Validating JWT for every private route
privateRoutes.use(jwtValidator({ secret: JWT_SECRET }))
privateRoutes.use((err, req, res, next) => err.name === 'UnauthorizedError' && next(new errors.Unauthorized()))
// #endregion

// #region ROUTES
privateRoutes.get('/', controllers.root.get)
privateRoutes.get('/list', controllers.list.get)

publicRoutes.post('/auth/pw', 
  requiredParams([ 'email', 'password' ]), 
  controllers.users.authenticateFromPassword, 
  controllers.users.create, 
  controllers.users.generateJWT
)
publicRoutes.post('/auth/google', controllers.users.authenticateFromGoogle, controllers.users.create, controllers.users.generateJWT)
publicRoutes.post('/auth/facebook', noop)

// #region Injecting public and private routes to server router
routes.use(publicRoutes)
routes.use(privateRoutes)
export default routes
// #endregion
