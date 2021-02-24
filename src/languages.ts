#!/usr/bin/env node
import { CONFIG_PATH } from "./vars";
import { loadConfig } from "./load-config";
import { getLanguages } from "./services/languages";
import { writeFile } from "./helpers/write-file";
import chalk from "chalk";
// ? TYPES:

const UNSUPPORTED_CODES = ["ca", "eu", "ko", "sr"];
// ca + eu: "code": 404, "error": "Model not found."
// ko + sr: wrong <tag> translation

const config = loadConfig(CONFIG_PATH);
const LANGUAGES_PATH =
  process.env.LANGUAGES_PATH || "./supported-languages.json";

function init() {
  console.log(chalk.bgYellow.black(" # Saving supported languages list: "));
  getLanguages(
    {
      url: config.url,
      apikey: config.apikey,
    },
    function (response) {
      const languages = response.languages
        .filter((l) => l.supported_as_target)
        .filter((l) => !UNSUPPORTED_CODES.includes(l.language));
      console.log(
        "[ " + chalk.yellow(languages.length) + " supported languages ]"
      );
      writeFile(
        LANGUAGES_PATH,
        JSON.stringify(languages, null, 2),
        "Supported languages saved!"
      );
    }
  );
}

init();
