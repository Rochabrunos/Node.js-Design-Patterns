import { readFile } from 'fs'

const cache = new Map()
/*
The problem with this function is that it behaves asynchronously until 
the file is read for the first time and the cache is set,
after that it behaves synchronously
*/

// Uses the cache map to store results of different file read operations
function inconsistentRead (filename, cb) {
    if (cache.has(filename)) {
        // Synchronously return the cached data
        cb(cache.get(filename))
    } else {
        // Asynchronously read the file and cache the result
        readFile(filename, 'utf8', (err, data) => {
            cache.set(filename, data)
            cb(data)
        })
    }
}