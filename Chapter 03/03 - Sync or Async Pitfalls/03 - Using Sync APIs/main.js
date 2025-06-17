import { consistentRead } from './read.js'
/**
 *  This is an example of on unpredictable behavior due to mixing 
 *  synchronous and asynchronous code. The reader2 can print to the
 *  console before reader1, even though it was created after reader1.
 *  The callback behavior is unpredictable. This bug is extremely 
 *  complicate to identify and reproduce in real applications.
 * @param {filename} filename 
 * @returns {data} The data read from the file
 */
function createFileReader (filename) {
    const data = consistentRead(filename)
    
    return data
}

const reader1 = createFileReader('file1.txt')
console.log(`Reader 1: ${reader1}`)

const reader2 = createFileReader('file1.txt')
console.log(`Reader 2: ${reader2}`)

