import errors from 'throw.js'
import _ from 'lodash'

import app from '../app'

const _showOriginalError = () => app.get('env') === 'development'
const _originalError = (originalError) => _showOriginalError() ? { originalError } : undefined

export default ({ message }) => {
  if (message.includes('custom validator')) {
    return new errors.UnprocessableEntity(
      `Erro na validação. Há algo de errado com: ${ _.chain(message).split('Value was ').last().value()}.`, 
      _originalError(message)
    )
  }

  if (message.toLowerCase().includes('access denied')) {
    return new errors.Forbidden(
      'Acesso negado.', 
      _originalError(message)
    )
  }

  if (message.includes('required')) {
    return new errors.UnprocessableEntity(
      `Existem campos obrigatórios que não estão preenchidos.`, 
      _originalError(message)
    )
  }

  if (_.chain(message).split(' ').first().value() === 'E11000') {
    return new errors.Conflict(
      `Criatividade! Tente algo novo, pois já temos um desses: ${_.chain(message).split('"').tail().first().value()}.`,
      _originalError(message)
    )
  }

  return new errors.InternalServerError(
    'Ocorreu algo muito estranho no servidor. Alguém ocasionalmente verificará isso.',
    _originalError(message)
  )
}