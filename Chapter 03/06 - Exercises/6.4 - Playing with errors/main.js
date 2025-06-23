import { EventEmitter } from 'events'

/**
 * Playing with errors: Modify the function created in the last exercise 
 * so that it produces an error if the timestamp at the moment of a 
 * tick (including the initial one that we added as part of exercise 6.3) is 
 * divisible by 5. Propagate the error using both the callback and the event 
 * emitter. Hint: use Date.now() to get the timestamp and the remainder (%) 
 * operator to check whether the timestamp is divisible by 5.
 */

let count = 0
function ticker(ms, cb) {
    const emitter = new EventEmitter()
    process.nextTick(() => {emitter.emit('tick'); count++})
    const interval = setInterval(() => {
        emitter.emit('tick')
        count++
        if (count % 5 == 0) emitter.emit('error', new Error(`${Date.now()}: An error occurred`))
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

