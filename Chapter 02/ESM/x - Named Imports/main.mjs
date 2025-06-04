// import * as loggerModule from './logger.mjs'
const logggerModule = require('./logger.mjs')
// import { log } from './logger.mjs'

// import { log, Logger } from './logger.mjs'

// To resolve a clash, we can use named imports
// import { log as myLog, Logger } from './logger.mjs'
const log = console.log
logggerModule.log(' ----- It\'s a test ----- ')
myLog('Hello world!')

// There is a risk of na collisions
const logger = new Logger('DEFAULT')
logger.log('Hello wolrd')