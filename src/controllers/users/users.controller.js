import jwt from 'jsonwebtoken'
import _ from 'lodash'
import errors from 'throw.js'
import * as messages from '../../i18n/messages'

import { User } from '../../model/index'
import { isError, handleErrors } from '../../errorHandlers'

const { JWT_SECRET } = process.env

export const authenticateFromPassword = async (req, res, next) => {
  try {
    if (!req._params) req._params = { ...req.query, ...req.params, ...req.body }
    const { email, password } = req._params

    const user = await User.findOne({ email }, 'password _id roles')
    if (isError(user)) return next(handleErrors(user))

    if (user && !user.authenticate(password)) {
      return next(new errors.Unauthorized(messages.wrongPassword))
    }
    req._params = { email, cleanPw: password }
    req._result = user
    return next()
  } catch (error) {
    console.error(error)
    return next(error)
  }
}

export const authenticateFromGoogle = (req, res, next) => {
  try {
    const { _auth } = req
    const token = jwt.sign({ id: _auth.id, roles: _auth.roles }, JWT_SECRET)
    return res.json({ token })
  } catch (error) {
    console.error(error)
    return next(error)
  }
}

export const generateJWT = (req, res, next) => {
  try {
    const { _result } = req
    const payload = _.pick(_result, ['_id', 'roles'])
    const token = jwt.sign(payload, JWT_SECRET)
    res._result = { token, payload }
    return next()
  } catch (error) {
    console.error(error)
    return next(error)
  }
}
