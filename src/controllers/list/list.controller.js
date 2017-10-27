import errors from 'throw.js'

import { User } from '../../model/index'
import { isError, handleDbErrors } from '../../errorHandlers'

/**
 * GET /list
 *
 * This is a sample route demonstrating
 * a simple approach to error handling and testing
 * the global error handler. You most certainly want to
 * create different/better error handlers depending on
 * your use case.
 */
export const get = async (req, res, next) => {
  const { title } = req.query

  if (title == null || title === '') {
    return next(new errors.UnprocessableEntity('The "title" parameter is required', '422.001'))
  }

  if (isError(user)) return next(handleDbErrors(user))
  
  res.json(user)
}