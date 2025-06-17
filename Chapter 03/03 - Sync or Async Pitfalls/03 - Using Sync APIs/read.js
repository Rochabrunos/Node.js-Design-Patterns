import { readFileSync } from 'fs'

/**
 *  This module is a pitfall of mixing synchronous and asynchronous code.
 *  It reads a file asynchronously and caches the result, but checking
 *  the cache is done synchronously.
 * 
 *  We can solve this issue by using readFileSync to eliminate the
 *  asynchronous behavior, doing so we don't need CPS pattern.
 *  In fact, it is best practice to use simple direct style when
 *  possible, and only use CPS when it is necessary.
 */
const cache = new Map()

export function consistentRead (filename) {
    if (cache.has(filename)) {
        // Synchronously return the cached data
        return cache.get(filename)
    } else {
        // Asynchronously read the file and cache the result
        const data = readFileSync(filename, 'utf8')
        cache.set(filename, data)
        return data
    }
}