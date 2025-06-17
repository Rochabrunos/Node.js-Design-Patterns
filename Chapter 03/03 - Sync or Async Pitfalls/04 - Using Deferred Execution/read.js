import { readFile } from 'fs'

/**
 *  This module is a pitfall of mixing synchronous and asynchronous code.
 *  It reads a file asynchronously and caches the result, but checking
 *  the cache is done synchronously.
 *  
 *  The second solution is to use deferred execution, which allows
 *  the code to be executed later, ensuring that the file is read
 *  before the data in the cache is returned. This organize the order
 *  of execution and avoids the unpredictable behavior of mixing
 *  synchronous and asynchronous code.
 */
const cache = new Map()

export function consistentRead (filename, cb) {
    if (cache.has(filename)) {
        // Synchronously return the cached data
        process.nextTick(() => cb(cache.get(filename)))
    } else {
        // Asynchronously read the file and cache the result
        readFile(filename, 'utf8' , (err, data) => {
            cache.set(filename, data)
            cb(data)
        })
    }
}