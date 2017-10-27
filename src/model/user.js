import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true 
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

export default mongoose.model('User', userSchema)