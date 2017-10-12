import { connect } from 'camo'

const connectToDb = async (dbUser, dbPassword, dbAddress) => await connect(`mongodb://${dbUser}:${dbPassword}@${dbAddress}`)

export default connectToDb