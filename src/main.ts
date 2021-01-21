#!/usr/bin/env node
import { LOCALE_FOLDER, OUTPUT_LANGUAGE, CONFIG_PATH } from "./vars";
import { loadConfig } from "./load-config";
import { fromDir } from "./helpers/from-dir";
import { readJsonFile } from "./helpers/read-json-file";
import { postTranslate } from "./services/translator";
import { indexOriginalDataMapping } from "./helpers/index-original-data-mapping";
import { translateFile } from "./translate";
import chalk from "chalk";
// ? TYPES:

const config = loadConfig(CONFIG_PATH);


function init() {
  console.log(chalk.bgMagenta("# Files to be translated:"));
  fromDir(
    LOCALE_FOLDER + "/" + config.inputLanguage,
    /\.json$/,
    function (filename) {
      console.log(chalk.magenta("- ") + filename);
      readJsonFile(filename, function (data) {
        const mappings = indexOriginalDataMapping(data);
        postTranslate({
          url: config.url,
          inputLanguage: config.inputLanguage,
          outputLanguage: OUTPUT_LANGUAGE,
          apikey: config.apikey,
          translations: mappings.array,
        }, function (response) {
          const outputPath = filename.replace(`/${config.inputLanguage}/`, `/${OUTPUT_LANGUAGE}/`);
          translateFile(filename, data, response, mappings.indexes, outputPath, {
            doubleCurly: mappings.doubleCurly
          });
        })
      });
    }
  );
}

init();
