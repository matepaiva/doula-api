import mongoose from 'mongoose'
import bluebird from 'bluebird'

mongoose.Promise = bluebird

const connectToDb = async (dbUser, dbPassword, dbAddress) => {
  const str = dbUser && dbPassword ? `mongodb://${dbUser}:${dbPassword}@${dbAddress}` : `mongodb://${dbAddress}`
  return mongoose.connect(str, { useMongoClient: true })
}

export default connectToDb
