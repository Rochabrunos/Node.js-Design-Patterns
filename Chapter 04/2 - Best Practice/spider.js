import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFilename } from './utils.js'

/**
 *  Refactoring the code to improve readability and maintainability, 
 *  by using a common sense approach:
 *  1 - Exit as soon as possible
 *  2 - Create named functionsfor callbacks
 *  3 - Modularize the code
*/

export function spider (url, cb) {
    const filename = urlToFilename(url)
    fs.access(filename, err => {
        if (!err || err.code !== 'ENOENT') return cb(null, filename, false)
        
        download(url, filename, (err, filename) => {
            if (err) return cb(err)

            cb(null, filename, true)
        })
    })
}

// Downloads the given web page and saves it
function download (url, filename, cb) {
    console.log(`Downloading ${url} into ${filename}`)
        superagent.get(url).end((err, res) => {
            if (err) return cb(err)

            saveFile(filename, res.text, err => {
                if (err) return cb(err)
                
                cb(null, res.text)
            })
        })
}

// Saves the content to a file
function saveFile (filename, content, cb) {
    mkdirp(path.dirname(filename), err => {
        if (err) return cb(err)
    
        fs.writeFile(filename, content, cb)
    })
}