import { noop, logger, args } from '.'
import cluster from 'cluster'
import os from 'os'

export interface App {
  start?: (callback: () => void) => Promise<void>
}

const start = (
  workers: number = os.cpus().length,
  callback: () => void = noop
): void => {
  if (cluster.isMaster) {
    logger.info(`Environment: ${args.env}`)

    logger.info(`Spawning cluster master with ${workers} workers`)
    for (let i = 0; i < workers; i += 1) {
      cluster.fork()
    }
    callback()
  } else {
    logger.info('Spawning a cluster worker')
    let app: App = require('../app')
    app.start(callback)
  }
}

export default { start }
