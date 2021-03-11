# Installation
`npm install node-json-ibm-watson-translator --save-dev`
or global
`npm install node-json-ibm-watson-translator -g`

# Usage
`node-json-ibm-watson-translator`

![Example Console](docs/assets/example-console.gif?raw=true)


# Vars

| Attribute | Default | Description |
| --- | --- | --- |
| `LOCALE_FOLDER` | `./locales` | Name of the locales folder, inside should be language folders e.g. "en" |
| `OUTPUT_LANGUAGES` | `fr` | Comma separated list of languages to be translated into |
| `CONFIG_PATH` | `./njiwt.json` | Path for the config file (see below) |
| `FORCED_GLOSSARY_FILES` | `g` | Comma separated list of names of the files that will not be translated, just copied |
| `COPY_FILES` | `index.ts,index.js` | Comma separated list of non-JSON file names to be copied |

# Config file structure (.json)
```
{
  "url": "https://...", // IBM service url here
  "apikey": "a1b2c3...", // IBM api key
  "inputLanguage": "en" // language code used for input it will use this folder too
}
```

# (Extra): Generate supported languages .json file
`LANGUAGES_PATH=./supported-languages.json node-json-ibm-watson-translator-languages`

# TODO
- Windows OS support
- Add the option not to translate certain words/phrases
- Multi level JSON objects. (At the moment only strings and arrays are supported)
- Instead of overwriting whole files, ability to add new keys only to existing translations
- Make sure attributes of html elements are not translated in all languages