import { ArgumentParser } from 'argparse'
import dotenv from 'dotenv'
import os from 'os'
import { address } from '.'
import { env } from 'process'

export type Environment = 'development' | 'staging' | 'production'

export interface AppArguments {
  env: Environment
  workers: number
  port: number
  idLength: number
  mysqlHost: string
  mysqlPort: number
  mysqlName: string
  mysqlUser: string
  mysqlPassword: string
  jwtSecret: string
  cloudinaryURL: string
  algoliaAppId: string
  algoliaAPIKey: string
  algoliaProductsIndex: string
}

// Parse .env files
const environment: Environment = (env.NODE_ENV as Environment) || 'development'
const filepath = `${env.PWD}/.env.${environment}`

dotenv.config({ path: filepath })

const parser = new ArgumentParser({
  version: '1.0.0',
  addHelp: true,
  description: 'API services'
})

// General arguments
parser.addArgument(['-w', '--workers'], {
  defaultValue: env.NODE_WORKERS || os.cpus().length,
  type: 'int',
  help: 'Workers number to be spawned'
})

parser.addArgument(['-p', '--port'], {
  help: 'Server port',
  type: 'int',
  defaultValue: env.NODE_PORT || 3000
})

parser.addArgument(['-i', '--idLength'], {
  help: 'IDs length',
  type: 'int',
  defaultValue: env.ID_LENGTH || 21
})

// MySQL arguments
parser.addArgument(['--mysqlPort'], {
  help: 'MySQL server port',
  type: 'int',
  defaultValue: env.MYSQL_PORT || 3306
})

parser.addArgument(['--mysqlHost'], {
  help: 'MySQL server host',
  type: 'string',
  defaultValue: env.MYSQL_HOST || address
})

parser.addArgument(['--mysqlName'], {
  help: 'MySQL database',
  type: 'string',
  defaultValue: env.MYSQL_NAME || 'database_dev'
})

parser.addArgument(['--mysqlUser'], {
  help: 'MySQL username',
  type: 'string',
  defaultValue: env.MYSQL_USER
})

parser.addArgument(['--mysqlPassword'], {
  help: 'MySQL password',
  type: 'string',
  defaultValue: env.MYSQL_PASSWORD
})

// Security arguments
parser.addArgument(['--jwtSecret'], {
  help: 'JsonWebToken secret',
  type: 'string',
  defaultValue: env.JWT_SECRET || '5U43R-53CR3T'
})

// API Keys
parser.addArgument(['--cloudinary'], {
  help: 'Cloudinary URL',
  type: 'string',
  defaultValue: env.CLOUDINARY_URL
})

parser.addArgument(['--algoliaAppId'], {
  help: 'Algolia App Id',
  type: 'string',
  defaultValue: env.ALGOLIA_APP_ID
})

parser.addArgument(['--algoliaAPIKey'], {
  help: 'Algolia API Key',
  type: 'string',
  defaultValue: env.ALGOLIA_API_KEY
})

parser.addArgument(['--algoliaProductsIndex'], {
  help: 'Algolia products index',
  type: 'string',
  defaultValue: env.ALGOLIA_PRODUCTS_INDEX
})

export const args: AppArguments = parser.parseArgs()
args.env = environment

export default args
