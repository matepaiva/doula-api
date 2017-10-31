import errors from 'throw.js'
import _ from 'lodash'
import { handleErrors } from '../../errorHandlers'
import * as messages from '../../i18n/messages'

/**
 * GET /
 */
export const documentation = (req, res) => res.json({ docs: 'will be placed here' })

export const create = Model => async (req, res, next) => {
  try {
    const { _isNew, _params } = req
    if (!_isNew) return next()
    const instance = await new Model(_params).save()
    req._result = instance
    return next()
  } catch (error) {
    console.error(error)
    return next(handleErrors(error))
  }
}

export const query = Model => async (req, res, next) => {
  try {
    if (!req._query) req._query = { ...(req._query || {}), ...req.query }
    const instance = await Model.query(req._query)
    req._result = instance
    return next()
  } catch (error) {
    console.error(error)
    return next(handleErrors(error))
  }
}

export const findById = (Model) => async (req, res, next) => {
  try {
    const { id } = req.params
    const _id = id === 'me' ? req.user._id : id
    const instance = await Model.findById(_id)
    if (!instance) return next(handleErrors({ status: 404 }))
    req._result = instance
    return next()
  } catch (error) {
    return next(handleErrors(error))
  }
}

export const findByIdAndUpdate = (Model, subModel) => async (req, res, next) => {
  try {
    if (!req._update) req._update = { ...req.query, ...req.params, ...req.body }
    req._id = req._id || req._update._id
    req._update = _.omit(req._update, '_id')
    const { _id, _update } = req
    const instance = await Model.findById(_id)
    instance.set(_update)
    if (subModel) {
      if (instance[subModel]) instance[subModel].set(_update)
      else instance[subModel] = _update
    }
    const response = await instance.save()
    req._result = response
    return next()
  } catch (error) {
    return next(handleErrors(error))
  }
}

export const getId = container => async (req, res, next) => {
  try {
    req._id = req[container]._id
    return next()
  } catch (error) {
    console.error(error)
    return next(handleErrors(error))
  }
}

export const res = (container = '_result') => async (req, res, next) => {
  try {
    const _result = req[container]
    res.json(_result)
  } catch (error) {
    console.error(error)
    return next(handleErrors(error))
  }
}

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
    if (!_.isEmpty(missingParams)) return next(new errors.UnprocessableEntity(messages.unprocessableEntity, { missingParams }))
    req._params = _.pick(params, requiredParams)
    return next()
  } catch (error) {
    console.error(error)
    next(handleErrors(error))
  }
}
