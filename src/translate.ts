// import chalk from "chalk";
import { doubleCurlyReplacement, tagReplacement } from "./helpers/replacements";
import { writeFile } from "./helpers/write-file";
// ? TYPES:
import { APITranslateOutput, JSONContent } from "./types";

export function translateFile(
  filename: string,
  originalData: JSONContent,
  output: APITranslateOutput,
  indexes: { [key: string]: number },
  outputPath: string,
  replacements: { doubleCurly: string[][]; tags: string[][] }
): void {
  // console.log(chalk.green("API Success: ") + filename);
  const translation = Object.entries(indexes).reduce(
    (final: JSONContent, [key, no]) => {
      const raw = output.translations[no].translation;
      const removedDoublyCurly = doubleCurlyReplacement(
        raw,
        replacements.doubleCurly[no]
      );
      const tagsFixed = tagReplacement(
        removedDoublyCurly,
        replacements.tags[no]
      );
      // console.log(tagsFixed);
      final[key] = tagsFixed;
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
