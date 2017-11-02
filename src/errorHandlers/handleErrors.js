import errors from 'throw.js'
import _ from 'lodash'
import * as messages from '../i18n/messages'

import app from '../app'

const _showOriginalError = () => app.get('env') === 'development'
const _originalError = (originalError) => _showOriginalError() ? { originalError } : undefined

export default (err) => {
  console.error(err)
  try {
    if (err.status === 404) return new errors.NotFound()

    if (err.name === 'CastError') {
      return new errors.BadRequest(messages.badRequest, _originalError(err))
    }

    if (err.name === 'ValidationError' && err.message && err.message.includes('required')) {
      return new errors.UnprocessableEntity(messages.missingParameters, _originalError(err))
    }

    if (err.name === 'ValidationError' || (err.message && err.message.includes('custom validator'))) {
      return new errors.UnprocessableEntity(messages.unprocessableEntity, _originalError(err))
    }

    if (err.message && err.message.toLowerCase().includes('access denied')) {
      return new errors.Forbidden(messages.forbidden, _originalError(err.message))
    }

    if (err.message && _.chain(err.message).split(' ').first().value() === 'E11000') {
      return new errors.Conflict(messages.conflict, _originalError(err))
    }

    return new errors.InternalServerError(messages.internalServerError, _originalError(err))
  } catch (error) {
    return new errors.InternalServerError(messages.internalServerError, _originalError(error))
  }
}
