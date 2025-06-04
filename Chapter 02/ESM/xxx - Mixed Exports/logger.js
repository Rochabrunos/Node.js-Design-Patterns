// Default export a function
export default function log(message) {
    console.log(message)
}

export function info(message) {
    log(`[INFO] ${message}`)
}