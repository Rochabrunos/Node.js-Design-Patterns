import fs from 'fs'

const originalReadFile = fs.readFile
let mockedResponse = null

function mockedReadFile (_, cb) {
    setImmediate(() => {
        cb(null, mockedResponse)
    })
}

export function mockEnable (respondWith) {
    mockedResponse = respondWith
    fs.readFile = mockedReadFile
}

export function mockDisable () {
    fs.readFile = originalReadFile
}