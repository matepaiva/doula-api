import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongooseQuery from 'mongoose-query'

const chatSchema = mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true })

chatSchema.plugin(mongooseQuery)

chatSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true
})

export default mongoose.model('Chat', chatSchema)
