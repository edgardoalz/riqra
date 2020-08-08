import { createLogger, transports, format } from 'winston'
import { Format } from 'logform'
import moment from 'moment'
import chalk from 'chalk'
import { args } from '.'

const pid = process.pid.toString()
const len = pid.length
const today = moment().format('YYYY/MM/DD')

const color = (level: string): any => {
  switch (level) {
    case 'info':
      return chalk.green
    case 'error':
      return chalk.red
    case 'warn':
      return chalk.yellow
    case 'debug':
      return chalk.blue
  }
  return chalk.gray
}

const custom = (): Format =>
  format.printf(info => {
    const { level, message } = info
    const time = moment().format('HH:MM:SS A')
    const tag = color(level)(`${pid}|${time} [${level.toUpperCase()}]:`)
    const msg = typeof message === 'object' ? JSON.stringify(message) : message
    return `${tag.padEnd(len)} ${msg}`
  })

// Create logger with all transports by log level
const logger = createLogger({
  transports: [
    new transports.Console({
      level: args.env === 'production' ? 'info' : 'debug',
      format: format.combine(format.timestamp(), custom())
    }),
    new transports.File({
      filename: `.logs/${today}-info.log`,
      level: 'info',
      format: format.simple()
    }),
    new transports.File({
      filename: `.logs/${today}-error.log`,
      level: 'error',
      format: format.simple()
    })
  ]
})

// Exports
export default logger
