import { Model, DataTypes } from 'sequelize'
import { db } from '../libs'

export interface User extends Model {
  id: string
  email: string
  password: string
}

export const UserModel = db.connect().define<User>('users', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  }
})
