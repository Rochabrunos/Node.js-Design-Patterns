import { inconsistentRead } from './read.js'
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
    const listeners = []
    inconsistentRead(filename, data => {
        listeners.forEach(listener => listener(data))
    })

    return {
        onDataReady: listener => listeners.push(listener)
    }
}

const reader1 = createFileReader('file1.txt')
reader1.onDataReady(data => {
    console.log(`Reader 1: ${data}`)
})

const reader2 = createFileReader('file1.txt')
reader2.onDataReady(data => {
    console.log(`Reader 2: ${data}`)
})
