#!/usr/bin/env node
import {
  LOCALE_FOLDER,
  OUTPUT_LANGUAGES,
  CONFIG_PATH,
  TRANSLATION_DELAY,
} from "./vars";
import { loadConfig } from "./load-config";
import { fromDir } from "./helpers/from-dir";
import { readJsonFile } from "./helpers/read-json-file";
import { postTranslate } from "./services/translator";
import { indexOriginalDataMapping } from "./helpers/index-original-data-mapping";
import { translateFile } from "./translate";
import chalk from "chalk";
// ? TYPES:

const config = loadConfig(CONFIG_PATH);

function init(outputLng: string) {
  console.log(chalk.bgMagenta(" # Files to be translated: "));
  console.log(chalk.cyan(config.inputLanguage + " ==> " + outputLng));
  fromDir(
    LOCALE_FOLDER + "/" + config.inputLanguage,
    /\.json$/,
    function (filename) {
      // console.log(chalk.magenta("- ") + filename);
      readJsonFile(filename, function (data) {
        const mappings = indexOriginalDataMapping(data);
        postTranslate(
          {
            url: config.url,
            inputLanguage: config.inputLanguage,
            outputLanguage: outputLng,
            apikey: config.apikey,
            translations: mappings.array,
          },
          function (response) {
            const outputPath = filename.replace(
              `/${config.inputLanguage}/`,
              `/${outputLng}/`
            );
            translateFile(
              filename,
              data,
              response,
              mappings.indexes,
              outputPath,
              {
                doubleCurly: mappings.doubleCurly,
                tags: mappings.tags,
              }
            );
          }
        );
      });
    }
  );
}

for (let i = 0; i < OUTPUT_LANGUAGES.length; i++) {
  (function (ind) {
    setTimeout(function () {
      init(OUTPUT_LANGUAGES[ind]);
    }, TRANSLATION_DELAY * ind);
  })(i);
}

// for (let i = 0; i < OUTPUT_LANGUAGES.length; i += 1) {
//   init(OUTPUT_LANGUAGES[i]);
// }
