// import chalk from "chalk";
import {
  doubleCurlyReplacement,
  tagReplacement,
  nestingReplacement,
} from "./helpers/replacements";
import { writeFile } from "./helpers/write-file";
// ? TYPES:
import { APITranslateOutput, JSONContent } from "./types";

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
  indexes: { [key: string]: number[] | number },
  outputPath: string,
  replacements: Replacements
): void {
  // console.log(chalk.green("API Success: ") + filename);
  // console.log(indexes);
  const translation = Object.entries(indexes).reduce(
    (final: JSONContent, [key, noArrayOrNumber]) => {
      const isArray = noArrayOrNumber.constructor === Array;
      const noArray: number[] = isArray
        ? (noArrayOrNumber as number[])
        : [noArrayOrNumber as number];
      let tagsFixedAll: string | string[] = [];
      let i: number;
      for (i = 0; i < noArray.length; i += 1) {
        const no = noArray[i];
        const raw = output.translations[no].translation;
        const replaced = replaceStuff(raw, no, replacements);
        if (isArray) {
          (tagsFixedAll as string[]).push(replaced);
        } else {
          tagsFixedAll = replaced;
        }
      }
      // console.log(tagsFixed);
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
