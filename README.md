# Installation
`npm install node-json-ibm-watson-translator --save-dev`
or global
`npm install node-json-ibm-watson-translator -g`

# Usage
`node-json-ibm-watson-translator`

# Vars

| Attribute | Default | Description |
| --- | --- | --- |
| `LOCALE_FOLDER` | `./locales` | Name of the locales folder, inside should be language folders e.g. "en" |
| `OUTPUT_LANGUAGES` | `fr` | Comma separated list of languages to be translated into |
| `CONFIG_PATH` | `./njiwt.json` | Path for the config file (see below) |

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
- Instead of overwriting whole files, ability to add new keys only to existing translations
- Make sure attributes of html elements are not translated in all languages