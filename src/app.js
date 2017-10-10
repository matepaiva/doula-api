import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import routes from './routes'
import errors from 'throw.js'
// import path from 'path'

const app = express()
app.disable('x-powered-by')

// View engine setup
// app.set('views', path.join(__dirname, '../views'))
// app.set('view engine', 'pug')
// app.use(express.static(path.join(__dirname, '../public')))

app.use(logger('dev', { skip: () => app.get('env') === 'test' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.use('/', routes)

// Catch 404 and forward to error handler
app.use((req, res, next) => next(new errors.NotFound()))

app.use((err, req, res, next) => {
  if (req.app.get('env') !== 'development' && req.app.get('env') !== 'test') delete err.stack
  res.status(err.statusCode || 500).json(err)
})

export default app
