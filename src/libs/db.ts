import { noop, args, logger, signal } from '.'
import { Sequelize, Model } from 'sequelize'

const host = `${args.mysqlHost}:${args.mysqlPort}/${args.mysqlName}`

let connection: Sequelize
export async function disconnect(): Promise<void> {
  if (connection) {
    logger.info('Closing database connection')
    return await connection.close()
  }
}

export function connect(fn: (error?: Error) => void = noop): Sequelize {
  if (connection) {
    fn()
    return connection
  }
  connection = new Sequelize(
    args.mysqlName,
    args.mysqlUser,
    args.mysqlPassword,
    {
      host: args.mysqlHost,
      port: args.mysqlPort,
      dialect: 'mysql',
      sync: { force: false, alter: true }
    }
  )
  logger.info(`Opening database connection to: mysql://${host}`)
  fn()
  return connection
}

signal.handle(async () => disconnect())

export { Model, Sequelize }
export default { connect, disconnect }
