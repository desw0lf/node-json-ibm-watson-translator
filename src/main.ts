#!/usr/bin/env node
import {
  LOCALE_FOLDER,
  OUTPUT_LANGUAGES,
  CONFIG_PATH,
  TRANSLATION_DELAY,
  FORCED_GLOSSARY_FILES,
} from "./vars";
import path from "path";
import { loadConfig } from "./load-config";
import { fromDir } from "./helpers/from-dir";
import { readJsonFile } from "./helpers/read-json-file";
import { postTranslate } from "./services/translator";
import { indexOriginalDataMapping } from "./helpers/index-original-data-mapping";
import { translateFile } from "./translate";
import { copyFile } from "./helpers/copy-file";
import chalk from "chalk";
import { spinnies } from "./helpers/spinnies";
// ? TYPES:

const config = loadConfig(CONFIG_PATH);

function init(outputLng: string) {
  // console.log(chalk.bgMagenta(" # Files to be translated: "));
  console.log(chalk.cyan(config.inputLanguage + " ==> " + outputLng));
  fromDir(
    LOCALE_FOLDER + "/" + config.inputLanguage,
    /\.json$/,
    function (filename) {
      const outputPath = filename.replace(
        `/${config.inputLanguage}/`,
        `/${outputLng}/`
      );
      spinnies.add(outputPath, { text: outputPath });
      // console.log(chalk.magenta("- ") + filename);
      const fname = path.parse(filename).name;
      if (FORCED_GLOSSARY_FILES.includes(fname)) {
        copyFile(filename, outputPath);
      } else {
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
    }
  );
}
// Starter consoles
const EMPTY_MAGENTA = "                                      ";
const IS_S = OUTPUT_LANGUAGES.length === 1 ? "" : "s";
console.log(chalk.bgMagenta(EMPTY_MAGENTA));
console.log(" ");
console.log(
  chalk.magenta(
    "## " +
      chalk.bold(OUTPUT_LANGUAGES.length) +
      " ## language" +
      IS_S +
      " to be translated: "
  )
);
console.log(chalk.yellow(OUTPUT_LANGUAGES.join(", ")));
console.log(chalk.magenta("-"));
console.log(" ");
// Starter consoles -- end

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
