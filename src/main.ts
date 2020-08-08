// Lib modules
import { args, cluster } from './libs'

// Run app
cluster.start(args.workers)
