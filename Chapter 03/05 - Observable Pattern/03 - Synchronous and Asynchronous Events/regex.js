import { EventEmitter } from 'events'
import { readFileSync } from 'fs'

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
        for (const file of this.files) {
            let content = null
            try {
            content = readFileSync(file, 'utf8')
            } catch (err) {
                this.emit('error', err)
                return 
            }
            this.emit('fileread', file)
            const match = content.match(this.regex)
            if (match) {
                match.forEach(elem => this.emit('found', file, elem))
            }
        }
        return this
    }
}