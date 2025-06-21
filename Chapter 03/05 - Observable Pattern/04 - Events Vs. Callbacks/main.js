import { EventEmitter } from 'events'
/**
 * The two functions are considered equivalent in functionality,
 * the difference lies in the approach to handling asynchronous operations.
 */
function helloEvents () {
    const eventEmitter = new EventEmitter()
    setTimeout(() => eventEmitter.emit('complete', 'Hello world!'), 100)
    return eventEmitter
}

function helloCallbacks (cb) {
    setTimeout(() => cb(null, 'Hello world!'), 100)
}

helloEvents().on('complete', message => console.log('Events: ', message))
helloCallbacks((err, message) => console.log('Callbacks: ', message) )