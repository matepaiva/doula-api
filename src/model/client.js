import mongoose from 'mongoose'

export default mongoose.Schema({
  isPregnant: { type: Boolean },
  pregnancyDueDate: { type: Date },
  pregnancyStartedAt: { type: Date },
  deliveryType: { type: String },
  deliveryLocationType: { type: String, enum: [ 'hospital', 'home', 'housePregnancy' ] }
}, { timestamps: true })
