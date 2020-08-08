import { User } from '../model'
import { args } from '.'
import jwt from 'jwt-simple'

const { jwtSecret } = args

const EXP = 8 * 60 * 60 * 1000

export function decode(token: string): User {
  return jwt.decode(token, jwtSecret) as User
}

export function encode(user: User): string {
  const { id, email } = user
  return jwt.encode({ id, email, exp: exp() }, jwtSecret)
}

export function anonymous(): string {
  return jwt.encode(
    { id: 'anonymous', email: 'anon@anonymous', exp: exp() },
    jwtSecret
  )
}

function exp(): number {
  return (Date.now() + EXP) / 1000
}

export default { decode, encode, anonymous }
