import { FindRegex } from './regex.js'

const findRegexInstance = new FindRegex(/Hello/)

findRegexInstance
    .addFile('fileA.txt')
    .addFile('fileB.txt')
    .find()
    .on('start', files => console.log(`${files} is being processed`))
    .on('fileread', file => console.log(`${file} was read`))
    .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
    .on('error', err => console.error(`Error emitter ${err.message}`))