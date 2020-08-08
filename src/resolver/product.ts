import { GraphQLError } from 'graphql'
import { AuthenticationError } from 'apollo-server-express'
import { logger, file } from '../libs'
import { Products } from '../repository'

export async function create(
  parent: any,
  args: any,
  context: any
): Promise<any> {
  try {
    const { user } = context
    if (!user) {
      return new AuthenticationError('To create products must be logged')
    }
    const image = await args.image
    const upload = await file.saveFile(image)

    args.image = upload.url
    args.userId = user.id

    const { id } = await Products.save(args)

    return id
  } catch (error) {
    logger.error(error)
    return new GraphQLError(error)
  }
}

export async function search(
  parent: any,
  args: any,
  context: any
): Promise<any[]> {
  try {
    const { user } = context
    if (!user) {
      throw new AuthenticationError('To search products must be logged')
    }

    const { term, page, limit } = args
    const { id: userId } = user

    return await Products.search(term, page, limit, userId)
  } catch (error) {
    logger.error(error)
    throw new GraphQLError(error)
  }
}

export default {
  create,
  search
}
