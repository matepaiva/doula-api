import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseHidden from 'mongoose-hidden'
import mongooseQuery from 'mongoose-query'
import mongooseDelete from 'mongoose-delete'

import doulaSchema from './doula'
import clientSchema from './client'

const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    hideJSON: true,
    type: String,
    required: true,
    unique: true
  },
  _password: {
    hideJSON: true,
    type: String
  },
  birthdate: {
    type: Date
  },
  bio: {
    type: String
  },
  image: {
    type: String
  },
  geolocation: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  asDoula: doulaSchema,
  asClient: clientSchema
}, { timestamps: true })

userSchema.plugin(mongooseHidden({
  defaultHidden: { password: true }
}))
userSchema.plugin(mongooseQuery, {
  ignoreKeys: ['password', 'email']
})

userSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true
})

userSchema.virtual('password')
  .set(function (password) {
    this._password = this.encryptPassword(password)
  })
  .get(function () {
    return this.password
  })

userSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function (plainPassword) {
    return bcrypt.compareSync(plainPassword, this._password)
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: (password) => password ? bcrypt.hashSync(password, 10) : ''
}

export default mongoose.model('User', userSchema)
