import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongooseQuery from 'mongoose-query'

const agreementSchema = mongoose.Schema({
  doula: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentStatus: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  startAt: {
    type: Date,
    required: true
  },
  finishAt: {
    type: Date,
    required: true
  },
  tax: {
    type: Number,
    required: true
  }
}, { timestamps: true })

agreementSchema.plugin(mongooseQuery)

agreementSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true
})

export default mongoose.model('Agreement', agreementSchema)
