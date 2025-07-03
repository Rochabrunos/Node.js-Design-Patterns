import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFilename, getPageLinks } from './utils.js'

/**
 *  We are now refactoring the code to add one more functionality:
 *  * It will be necessary to download all the links contained in the web page recursively
*/

// Downloads the given web page and saves it
function download (url, filename, cb) {
    console.log(`Downloading ${url} into ${filename}`)
        superagent.get(url).end((err, res) => {
            if (err) return cb(err)
                
            saveFile(filename, res.body.toString(), err => {
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

function spiderLinks (url, requestContent, nesting, cb) {
    if (nesting === 0) return process.nextTick(cb)

    const links = getPageLinks(url, requestContent)

    if (links.length === 0) return process.nextTick(cb)

    let completed = 0
    let hasErrors = false

    // This function will iterate through the links
    function done (err) {
        if (err) {
            hasErrors = true
            return cb(err)
        }
        // If there are no errors, increment the counter until all links are processed
        // when all links are processed, the recursion will end
        // and the callback will be called
        if (++completed === links.length && !hasErrors) {
            return cb()
        }
    }
    // Call spider for each link asynchronously
    links.forEach(l => spider(l, nesting - 1, done))
}

export function spider (url, nesting, cb) {
    const filename = urlToFilename(url)
    fs.access(filename, (err, fileContent) => {
        if (err)  {
            if (err.code !== 'ENOENT') return cb(err)
        
            return download(url, filename, (err, requestContent) => {
                if (err) return cb(err)

                spiderLinks(url, requestContent, nesting, cb)
            })
        } 
        spiderLinks(url, fileContent, nesting, cb)
    })
}

