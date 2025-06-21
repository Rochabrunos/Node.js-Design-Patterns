import { EventEmitter } from 'events'
import { readFile } from 'fs'

/** Question 1
 * A simple event: Modify the asynchronous FindRegex class so that it emits 
 * an event when the find process starts, passing the input files list as an
 *  argument. Hint: beware of Zalgo!
 */
// By extending the EventEmitter class we create a fully fledged observable class
export class FindRegex extends EventEmitter {
    constructor (regex) {
        // Initialize the EventEmitter internals
        super()
        this.regex = regex
        this.files = []
    }

    addFile (file) {
        this.files.push(file)
        return this
    }

    find () {
        process.nextTick(() => this.emit('start', this.files))
        for (const file of this.files) {
            readFile(file, 'utf8', (err, content) => {
                if (err) {
                    // This is a special event where we emit an error and 
                    // pass an Error object as argument
                    return this.emit('error', err)
                }
                // Here the file was read successfully
                this.emit('fileread', file)

                // Now we can seach what we need in the file`s content
                const match = content.match(this.regex)
                if (match) {
                    match.forEach(elem => this.emit('found', file, elem))
                }

            })
        }
        return this
    }
}