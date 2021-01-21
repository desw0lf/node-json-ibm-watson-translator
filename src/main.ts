#!/usr/bin/env node
import { LOCALE_FOLDER, OUTPUT_LANGUAGE, CONFIG_PATH } from "./vars";
import { loadConfig } from "./load-config";
import { fromDir } from "./helpers/from-dir";
import { readJsonFile } from "./helpers/read-json-file";
import { postTranslate } from "./services/translator";
import { indexOriginalDataMapping } from "./helpers/index-original-data-mapping";
import { writeFile } from "./helpers/write-file";
import chalk from "chalk";
// ? TYPES:
import { APITranslateOutput, JSONContent } from "./types";

const config = loadConfig(CONFIG_PATH);

function translateFile(filename: string, originalData: JSONContent, output: APITranslateOutput, indexes: {[key: string]: number}, outputPath: string, replacements: { doubleCurly: string[][] }): void {
  console.log(chalk.green("API Success: ") + filename);
  const translation = Object.entries(indexes).reduce((final: JSONContent, [key, no]) => {
    const raw = output.translations[no].translation;
    final[key] = raw;
    // console.log(replacements.doubleCurly[no]);
    return final;
  }, {...originalData});
  // console.log(outputPath);
  writeFile(outputPath, JSON.stringify(translation, null, 2));
  // console.log(translation);
  // console.log(output);
  // console.log(indexes);
  // console.log(originalData);
}

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
