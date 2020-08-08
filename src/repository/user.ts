import { User, UserModel } from '../model'
import { v4 } from 'uuid'

export async function save(user: User): Promise<User> {
  user.id = v4()
  return await UserModel.create(user)
}

export async function findByEmail(email: string): Promise<User> {
  return UserModel.findOne({ where: { email } })
}
