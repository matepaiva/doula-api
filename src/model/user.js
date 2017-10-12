import { Document } from 'camo'

export default class User extends Document {
  constructor() {
    super()
    this.name = {
      type: String,
      required: true,
    }
    this.birthdate = {
      type: Date
    }
    this.cpf = {
      type: String,
      unique: true
    }
  }

  static collectionName() {
    return 'users';
  }
}