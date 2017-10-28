import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
  name: { 
    type: String, 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
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
  roles: {
    type: Number,
    default: 1,
    required: true
  },
  doula: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doula'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }
}, { timestamps: true })

userSchema.virtual('cleanPw')
  .set(function (cleanPw) {
    this._password = cleanPw
    this.password = this.encryptPassword(cleanPw)
  })
  .get(function () {
    return this._password
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
    return bcrypt.compareSync(plainPassword, this.password)
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