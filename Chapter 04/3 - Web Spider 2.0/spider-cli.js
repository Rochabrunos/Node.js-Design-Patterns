import { spider } from './spider.js'

/**
 *  To run this script, use the following command:
 *  node spider-cli.js <url> [nesting]
 *  node spider-cli.js https://example.com 2
 */
const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3], 10) || 1

spider(url, nesting, err => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Download complete`)
})