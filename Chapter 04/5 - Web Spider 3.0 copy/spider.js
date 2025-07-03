import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFilename, getPageLinks } from './utils.js'

/**
 *  We have now a race condition in the code, when the spider is called twice one after the other
 *  will cause the spider to download the same page twice
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

const spidering = new Set()
export function spider (url, nesting, cb) {
    if (spidering.has(url)) return process.nextTick(cb)
    
    spidering.add(url)
    const filename = urlToFilename(url)
    fs.access(filename, (err, fileContent) => {
        if (err)  {
            if (err.code !== 'ENOENT') return cb(err)
        
            return download(url, filename, (err, requestContent) => {
                if (err) return cb(err)

                spiderLinks(url, requestContent, nesting, cb)
                spidering.delete(url)
            })
        } 
        spiderLinks(url, fileContent, nesting, cb)
        spidering.delete(url)
    })
}

