import { EventEmitter } from 'events'

function ticker(ms, cb) {
    const emitter = new EventEmitter()
    const interval = setInterval(() => {
        emitter.emit('tick')
        
    }, 50)
    setTimeout(() => {
        clearInterval(interval)
        emitter.emit('complete')
        cb()
    }, ms)
  
    return emitter
}

ticker(1000, () => console.log('Callback executed after 1 second'))
    .on('tick', () => console.log('Tick event emitted'))
    .on('complete', () => console.log('Ticker completed'))
    .on('error', err => console.error(`Error emitter ${err.message}`))