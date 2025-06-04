const SUPPORTED_LANGUAGES = [`el`, `en`, `es`, `it`, `pl`]
const selectedLanguage = process.argv[2] || `en`

if (!SUPPORTED_LANGUAGES.includes(selectedLanguage)) {
    console.error(`The specified language is not supported`)
    process.exit(1)
}

const translationModule = `./string-${selectedLanguage}.js`
import((translationModule)).then((s) => console.log(s.HELLO))