// #region NODE_MODULES IMPORT
import { Router } from 'express'
import jwtValidator from 'express-jwt'
import errors from 'throw.js'
// import google from 'googleapis'
// #endregion

// #region LOCAL IMPORT
import noop from './utils/noop'
import { requiredParams, create, query, findById, findByIdAndUpdate, documentation, res, getId } from './controllers/global/global.controller'
import { authenticateFromPassword, generateJWT } from './controllers/users/users.controller'
import { User } from './model/index'
// #endregion

// #region GLOBAL CONSTANTS
const {
  JWT_SECRET
  // GOOGLE_CLIENT_ID,
  // GOOGLE_CLIENT_SECRET
} = process.env
// const plus = google.plus('v1')
// const OAuth2 = google.auth.OAuth2;
// const oauth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, '')
// #endregion

// #region Creating instances of Router() to create public and private routes
const routes = Router()
// #endregion

routes.post('/auth/pw', requiredParams([ 'email', 'password' ]), authenticateFromPassword, create(User), generateJWT)
// #region PUBLIC ROUTES
routes.post('/auth/google', noop)
routes.post('/auth/facebook', noop)
// #endregion

// #region Validating JWT for every private route
routes.use(jwtValidator({ secret: JWT_SECRET }))
routes.use((err, req, res, next) => err.name === 'UnauthorizedError' ? next(new errors.Unauthorized()) : next(err))
// #endregion

// #region PRIVATE ROUTES
routes.get('/', documentation)

// USER ROUTES
routes.put('/users', getId('user'), findByIdAndUpdate(User), res())
routes.get('/users/:id', findById(User), res())
routes.get('/users', query(User), res())
// DOULA ROUTES
routes.put('/doulas', getId('user'), findByIdAndUpdate(User, 'asDoula'), res())

// CLIENT ROUTES
routes.put('/clients', getId('user'), findByIdAndUpdate(User, 'asClient'), res())
// #endregion

// #region Injecting public and private routes to server router
export default routes
// #endregion
