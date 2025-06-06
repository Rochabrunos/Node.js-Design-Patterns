
/*
All theses references are missing in the context of ESM.
console.log(exports)
console.log(module)
console.log(__filename)
console.log(__dirname)
*/

import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Define __filename and __dirname for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirName = dirname(__filename)
console.log(`__filename: ${__filename}\n__dirname: ${__dirName}\n`)

// How to load a CommonJS module in ESM
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

// Now you can use require to load CommonJS modules
const fs = require('fs')

// The global this is not available in ESM; thus, will throw an error
console.log('This is the global object in ESM:', this)