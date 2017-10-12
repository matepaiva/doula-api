import emoji from 'node-emoji'

import app from './app'
import { connectToDb } from './model'

const { DB_USER, DB_PASSWORD, DB_ADDRESS, PORT = 8080 } = process.env

connectToDb(DB_USER, DB_PASSWORD, DB_ADDRESS)
  .then(() => {
    console.log(`->  ${emoji.get('heart')} Database connected  ${emoji.get('heart')}`) // eslint-disable-line no-console
    app.listen(PORT, () => console.log(`->  ${emoji.get('heart')} Running on  /:${PORT}  ${emoji.get('heart')}`)) // eslint-disable-line no-console
  })
