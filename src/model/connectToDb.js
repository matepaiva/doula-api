import mongoose from 'mongoose'
import bluebird from 'bluebird'

/**
 * String
    lowercase: boolean, whether to always call .toLowerCase() on the value
    uppercase: boolean, whether to always call .toUpperCase() on the value
    trim: boolean, whether to always call .trim() on the value
    match: RegExp, creates a validator that checks if the value matches the given regular expression
    enum: Array, creates a validator that checks if the value is in the given array.

  Number
    min: Number, creates a validator that checks if the value is greater than or equal to the given minimum.
    max: Number, creates a validator that checks if the value is less than or equal to the given maximum.
  
  Date
    min: Date
    max: Date
 */

mongoose.Promise = bluebird

const connectToDb = async (dbUser, dbPassword, dbAddress) => await mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbAddress}`, { useMongoClient: true })

export default connectToDb