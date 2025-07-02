import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFilename } from './utils.js'

/**
 *  This code represents a tipycal example of a callback hell situation.
 *  Along the chapter we will refactor this code using different patterns 
 *  to improve its readability and maintainability.
 *  The spider download a web page and save it to a file.
 *  1 - Err is propagated through the callback functions
 *  2 - The code is not readable, one monolithic function
 *  3 - The code is not maintainable, add new features is difficult
 *  4 - The code is not cohesive, it does too many things
*/

export function spider (url, cb) {
    const filename = urlToFilename(url)
    fs.access(filename, err => { // err is propagated throught all  the callback functions
        if (err && err.code === 'ENOENT') {
            console.log(`Downloading ${url} into ${filename}`)
            superagent.get(url).end((err, res) => {
                if (err) {
                    cb(err)
                } else {
                    mkdirp(path.dirname(filename), err => {
                        if (err) {
                            cb(err)
                        } else {
                            fs.writeFile(filename, res.text, err => {
                                if (err) {
                                    cb(err)
                                } else {
                                    cb(null, filename)
                                }
                            })
                        }
                    })
                }
            })
        } else {
            cb(null, filename, false) // File already exists
        }
    })
}