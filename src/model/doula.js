import mongoose from 'mongoose'

const doulaSchema = mongoose.Schema({
  certifiedBy: {
    type: String
  },
  yearsExp: { 
    type: Number, 
    min: 0, 
  },
  backupDoula: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doula' 
  },
  clients: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    situation: { type: String, required: true, default: 'AP', enum: [ 'AP', 'PR' ] }
  }],
  website: {
    type: String
  }
}, { timestamps: true })

export default mongoose.model('Doula', doulaSchema)