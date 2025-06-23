import { EventEmitter } from 'events'

/**
 * A simple modification: Modify the function created in exercise 3.2 so that it 
 * emits a tick event immediately after the function is invoked.
 */

let count = 0
function ticker(ms, cb) {
    const emitter = new EventEmitter()
    process.nextTick(() => {emitter.emit('tick'); count++})
    const interval = setInterval(() => {
        emitter.emit('tick')
        count++
    }, 50)
    setTimeout(() => {
        clearInterval(interval)
        emitter.emit('complete')
        console.log(`Total ticks: ${count}`)
        cb()
    }, ms)
  
    return emitter
}

ticker(1000, () => console.log('Callback executed after 1 second'))
    .on('tick', () => console.log('Tick event emitted'))
    .on('complete', () => console.log('Ticker completed'))
    .on('error', err => console.error(`Error emitter ${err.message}`))

