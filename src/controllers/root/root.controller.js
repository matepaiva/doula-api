import errors from 'throw.js'
import _ from 'lodash'

/**
 * GET /
 */
export const get = (req, res) => res.json({ olar: 'olar' })

export const requiredParams = (requiredParams) => (req, res, next) => {
  try {
    const params = {
      ...req.params,
      ...req.body,
      ...req.query
    }
    if (!requiredParams || !requiredParams.length) next()
    const missingParams = requiredParams
      .filter(param => _.isNil(params[param]))
    if (!_.isEmpty(missingParams)) {
      return next(new errors.UnprocessableEntity(`Existem campos obrigatórios que não estão preenchidos.`, { missingParams }))
    } else {
      req._params = _.pick(params, requiredParams)
      return next()
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}