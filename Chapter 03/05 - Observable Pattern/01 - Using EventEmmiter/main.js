import { findRegex } from './regex.js'

findRegex(['fileA.txt', 'fileB.txt'], "Hello")
    .on('fileread', file => console.log(`${file} was read`))
    .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
    .on('error', err => console.error(`Error emitter ${err.message}`))