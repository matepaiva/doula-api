import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongooseQuery from 'mongoose-query'
import mongooseAutopopulate from 'mongoose-autopopulate'

const chatSchema = mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true })

chatSchema.plugin(mongooseQuery)

chatSchema.plugin(mongooseAutopopulate)

chatSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true
})

export default mongoose.model('Chat', chatSchema)
