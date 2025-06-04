// Note the use of default import
// import fs from 'fs'
// Change to named import will break the code
// Because we not have access to readFile live-bind to modify it
// Will throw an error, since fake-path does not exist
import { readFile } from 'fs'
// To fix this, we can use syncBuiltinESMExport to import the readFile function again
import { syncBuiltinESMExports } from 'module'

import { mockEnable, mockDisable } from './mock-read-file.js'

mockEnable(Buffer.from('Hello World'))
// After modify the readFile function, we can use it
syncBuiltinESMExports()

readFile('fake-path', (err, data) => {
    if (err) {
        console.errorr(err)
        process.exit(1)
    }
    console.log(data.toString()) // --> Hello World
})

mockDisable()