import { logger } from '.'

// List of listeners
const listeners: ((signal?: NodeJS.Signals) => Promise<any>)[] = []

// Using a single function to handle multiple signals
export async function handler(signal: NodeJS.Signals): Promise<any> {
  try {
    logger.info(`Received ${signal} signal.`)
    await Promise.all(listeners.map(l => l(signal)))
    logger.info('Exit successfully')
    process.exit(0)
  } catch (error) {
    const { message, stack } = error
    logger.error(`Error on exit: ${message} | ${stack}`)
    process.exit(1)
  }
}

process.on('SIGINT', (signal: NodeJS.Signals) => {
  handler(signal)
})
process.on('SIGTERM', (signal: NodeJS.Signals) => {
  handler(signal)
})

const handle = (listener: (signal?: NodeJS.Signals) => Promise<any>): number =>
  listeners.push(listener)

export const emit = (signal: NodeJS.Signals): boolean =>
  process.emit(signal, signal)

export default { handle, emit }
