import mongoose from 'mongoose'

const clientSchema = mongoose.Schema({
  isPregnant: { type: Boolean },
  pregnancyDueDate: { type: Date },
  pregnancyStartedAt: { type: Date },
  deliveryType: { type: String },
  deliveryLocationType: { type: String, enum: [ 'hospital', 'home', 'housePregnancy' ] }
}, { timestamps: true })

export default mongoose.model('Client', clientSchema)