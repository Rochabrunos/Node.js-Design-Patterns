import { EventEmitter } from 'events'

/**
 * Ticker: Write a function that accepts a number and a callback as the arguments. 
 * The function will return an EventEmitter that emits an event called tick 
 * every 50 milliseconds until the number of milliseconds is passed from the 
 * invocation of the function. The function will also call the callback when 
 * the number of milliseconds has passed, providing, as the result, the total 
 * count of tick events emitted. Hint: you can use setTimeout() to schedule another setTimeout() recursively.
 */

let count = 0
function ticker(ms, cb) {
    const emitter = new EventEmitter()
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