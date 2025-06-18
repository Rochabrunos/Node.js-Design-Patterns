import { FindRegex } from './regex.js'

const findRegexInstance = new FindRegex(/Hello/)

/** 
 * In this example we subscribe to the events after we call the `find`method.
 *  This works only because we use asynchronous events.
 * */
// findRegexInstance
//     .addFile('fileA.txt')
//     .addFile('fileB.txt')
//     .find()
//     .on('fileread', file => console.log(`${file} was read`))
//     .on('found', (file, match) => console.log(`Matched1 "${match}" in ${file}`))
//     .on('error', err => console.error(`Error emitter ${err.message}`)) 

// Let's change the code to make it synchronous and do the same call
// It won't work because now the events are ommited in the same tick of 
// the event loop before we subscribe to them


// Solution is to make the call to `find` method after we subscribe to the events
findRegexInstance
    .addFile('fileA.txt')
    .addFile('fileB.txt')
    .on('fileread', file => console.log(`${file} was read`))
    .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
    .on('error', err => console.error(`Error emitter ${err.message}`)) 
    .find()


    