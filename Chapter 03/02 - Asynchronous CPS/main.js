function addAsync(a, b, callback) {
    setTimeout(() => callback(a + b), 100)
}

console.log('Before')
// It will return immediately and the callback will be called later
addAsync(1, 2, r => console.log(`Result: ${r}`)) 
console.log('After')