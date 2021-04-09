// import chalk from "chalk";
import {
  doubleCurlyReplacement,
  tagReplacement,
  nestingReplacement,
} from "./helpers/replacements";
import { writeFile } from "./helpers/write-file";
import { checkType } from "./helpers/check-type";
// ? TYPES:
import { APITranslateOutput, JSONContent, Indexes } from "./types";

interface Replacements {
  doubleCurly: string[][];
  tags: string[][];
  nesting: string[][];
}

function replaceStuff(
  raw: string,
  no: number,
  replacements: Replacements
): string {
  const removedDoublyCurly = doubleCurlyReplacement(
    raw,
    replacements.doubleCurly[no]
  );
  const tagsFixed = tagReplacement(removedDoublyCurly, replacements.tags[no]);
  const nestingFixed = nestingReplacement(tagsFixed, replacements.nesting[no]);
  return nestingFixed;
}

export function translateFile(
  filename: string,
  originalData: JSONContent,
  output: APITranslateOutput,
  indexes: Indexes,
  outputPath: string,
  replacements: Replacements
): void {
  // console.log(chalk.green("API Success: ") + filename);
  // console.log(indexes);
  const translation = Object.entries(indexes).reduce(
    (final: JSONContent, [key, noArrayOrNumber]) => {
      const type = checkType(noArrayOrNumber);
      // const isArray = noArrayOrNumber.constructor === Array;
      const obj = type === "IS_OBJECT" ? Object.entries(noArrayOrNumber) : [];
      function na() {
        if (type === "IS_ARRAY") {
          return noArrayOrNumber as number[];
        }
        if (type === "IS_NUMBER") {
          return [noArrayOrNumber as number];
        }
        console.log({ noArrayOrNumber, z: obj.map((item) => item[1]) });
        return obj.map((item) => item[1]);
      }
      const noArray: number[] | { [key: string]: number } = na();
      // console.log({ noArray });
      // else
      let tagsFixedAll: string | string[] | { [key: string]: string } = [];
      let i: number;
      for (i = 0; i < noArray.length; i += 1) {
        const no = noArray[i];
        const raw = output.translations[no].translation;
        const replaced = replaceStuff(raw, no, replacements);
        if (type === "IS_ARRAY") {
          (tagsFixedAll as string[]).push(replaced);
        } else if (type === "IS_NUMBER") {
          tagsFixedAll = replaced;
        } else {
          console.log({ l: obj[i][0], replaced });
          if (tagsFixedAll.constructor === Array) {
            tagsFixedAll = {};
          }
          tagsFixedAll = {
            ...(tagsFixedAll as { [key: string]: string }),
            [obj[i][0]]: replaced,
          };
        }
      }
      // console.log(tagsFixedAll);
      final[key] = tagsFixedAll;
      return final;
    },
    { ...originalData }
  );
  // console.log(outputPath);
  writeFile(outputPath, JSON.stringify(translation, null, 2));
  // console.log(translation);
  // console.log(output);
  // console.log(indexes);
  // console.log(originalData);
}
