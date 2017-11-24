// #region NODE_MODULES IMPORT
import { Router } from 'express'
import jwtValidator from 'express-jwt'
import errors from 'throw.js'
// import google from 'googleapis'
// #endregion

// #region LOCAL IMPORT
import noop from './utils/noop'
import { requiredParams, create, query, findById, findByIdAndUpdate, documentation, findByIdAndDelete, res, getId, override, allowAccessTo } from './controllers/global/global.controller'
import { authenticateFromPassword, generateJWT } from './controllers/users/users.controller'
import { User, Chat } from './model/index'
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

// #region PUBLIC ROUTES
routes.post('/users', requiredParams([ 'email', 'password' ]), authenticateFromPassword, create(User), generateJWT, res())
routes.post('/users/google', noop)
routes.post('/users/facebook', noop)
// #endregion

// #region Validating JWT for every private route
routes.use(jwtValidator({ secret: JWT_SECRET }))
routes.use((err, req, res, next) => err.name === 'UnauthorizedError' ? next(new errors.Unauthorized()) : next(err))
// #endregion

// #region PRIVATE ROUTES
routes.get('/', documentation)

// USER ROUTES
routes.put('/users', getId('user'), findByIdAndUpdate(User), res())
routes.put('/users/:id', allowAccessTo([ 'Admin' ]), findByIdAndUpdate(User), res())
routes.delete('/users/:id', allowAccessTo([ 'Admin' ]), findByIdAndDelete(User), res())
routes.get('/users/:id', findById(User), res())
routes.get('/users', query(User), res())

// DOULA ROUTES
routes.put('/doulas', getId('user'), findByIdAndUpdate(User, 'asDoula'), res())

// CLIENT ROUTES
routes.put('/clients', getId('user'), findByIdAndUpdate(User, 'asClient'), res())
// #endregion

// CHAT ROUTES
routes.post('/chats', override({ 'body.from': 'user._id' }), create(Chat), res())
routes.get('/chats', override({ 'query.from': 'user._id' }), query(Chat), res())
routes.delete('/chats/:_id', override({ 'body.from': 'user._id' }), findByIdAndDelete(Chat), res())

// #region Injecting public and private routes to server router
export default routes
// #endregion
