import { EventEmitter } from 'events';
import { readFile } from 'fs';

/**
 * The findRegex function will emit three events:
 * - 'fileread' when a file is read
 * - 'found' when a match is found in the file
 * - 'error' if there is an error reading a file
 */
export function findRegex (files, regex) {
    const emitter = new EventEmitter()

    for (const file of files) {
        readFile(file, 'utf8', (err, content) => {
            if (err) {
                return emitter.emit('error', err)
            }

            emitter.emit('fileread', file)
            const match = content.match(regex)
            if (match) {
                match.forEach(elem => emitter.emit('found', file, elem))
            }
        })
    }
    return emitter;
}