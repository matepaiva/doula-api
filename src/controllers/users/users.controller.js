import jwt from 'jsonwebtoken'
import _ from 'lodash'

import { User } from '../../model/index'
import { isError, handleDbErrors } from '../../errorHandlers'

const { JWT_SECRET } = process.env

export const authenticate = (req, res) => {
  try {
    const { user } = req
    const token = jwt.sign({ ...user }, JWT_SECRET)
    return res.json({ token, user })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const create = async (req, res, next) => {
  try {
    // Get all the body, because the model will handle data and use just what is important.
    const user = await User(req.body).save().catch(err => err)

    // Handle errors
    if (isError(user)) return next(handleDbErrors(user))
    
    // Go to next middleware to get token
    req.user = user
    next()
  } catch (error) {
    console.error(error)
    next(error)    
  }
}
