import { readFile } from 'fs'

/**
 *  This module is a pitfall of mixing synchronous and asynchronous code.
 *  It reads a file asynchronously and caches the result, but checking
 *  the cache is done synchronously.
 */
const cache = new Map()

export function inconsistentRead (filename, cb) {
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