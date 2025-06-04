import { count, increment } from './counter.js'

console.log(`Initial count: ${count}`)
// This will work because in the scope of this module, `count`is a live binding
increment()
console.log(`Count after increment: ${count}`)

// This will not work as `count` is a read-only binding - comment this line
count += 1