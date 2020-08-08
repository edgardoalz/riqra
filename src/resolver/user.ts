import { Users } from '../repository'
import { jwt, pwd } from '../libs'
import { GraphQLError } from 'graphql'
import { AuthenticationError } from 'apollo-server-express'

/**
 * USERS HANDLERS
 */
export async function signup(parent: any, args: any): Promise<any> {
  try {
    const { email, password } = args

    const userFound = await Users.findByEmail(email)
    if (userFound) {
      return new AuthenticationError('User already exists')
    }

    if (password.length <= 6) {
      return new AuthenticationError(
        'Password must be longer than 6 characters'
      )
    }

    args.password = await pwd.hash(password)
    const user = await Users.save(args)

    return jwt.encode(user)
  } catch (endError) {
    return new GraphQLError(endError)
  }
}

export async function login(parent: any, args: any): Promise<any> {
  const { email, password } = args

  const userFound = await Users.findByEmail(email)
  if (!userFound) {
    throw new AuthenticationError('User not found')
  }

  if (!(await pwd.compare(password, userFound.password))) {
    throw new AuthenticationError('Oops! incorrect password')
  }

  return jwt.encode(userFound)
}

export default {
  signup,
  login
}
