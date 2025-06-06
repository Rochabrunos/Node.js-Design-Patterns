// A single function that takes two arguments and returns their sum
function add(a, b) {
    return a + b
}

function addCps(a, b, callback) {
    callback(a + b)
}

console.log('Before')
// Here we call the synchronous function, get the result
console.log(add(1,2))
console.log('After 1')

// Here we call the CPS version of the function, consume the result
addCps(1,2, (r) => console.log(r))
console.log('After 2')
