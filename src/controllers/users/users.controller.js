import jwt from 'jsonwebtoken'
import _ from 'lodash'
import errors from 'throw.js'
import bcrypt from 'bcrypt'

import { User } from '../../model/index'
import { isError, handleDbErrors } from '../../errorHandlers'

const { JWT_SECRET } = process.env

export const authenticateFromPassword = async (req, res, next) => {
  try {
    const { email, password } = req._params

    const user = await User.findOne({ email }, 'password _id roles')
    if (isError(user)) return next(handleDbErrors(user))

    req._newUser = user ? false : true

    if (user && !bcrypt.compareSync(password, user.password)) {
      return next(new errors.Unauthorized('Usuário e senha não conferem.'))
    }
    req._params = { email, cleanPw: password }
    req._jwt = _.pick(user, ['_id', 'roles'])
    next()
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const authenticateFromGoogle = (req, res) => {
  try {
    const { _auth } = req
    const token = jwt.sign({ id: _auth.id, roles: _auth.roles }, JWT_SECRET)
    return res.json({ token, auth })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const generateJWT = (req, res, next) => {
  try {
    const { _jwt } = req
    const token = jwt.sign(_jwt, JWT_SECRET)
    return res.json({ token, _jwt })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const create = async (req, res, next) => {
  try {
    const { _newUser, _params } = req
    if (!_newUser) return next()
    const user = await User(_params).save().catch(err => err)

    // Handle errors
    if (isError(user)) return next(handleDbErrors(user))
    
    // Go to next middleware to get token
    req._jwt = _.pick(user, ['_id', 'roles'])
    next()
  } catch (error) {
    console.error(error)
    next(error)    
  }
}
