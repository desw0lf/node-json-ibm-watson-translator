import {
  getInsideDoubleCurly,
  getInsideTag,
  getInsideNesting,
} from "../helpers/replacements";
import chalk from "chalk";
// ? TYPES:
import { JSONContent } from "../types";

export function indexOriginalDataMapping(
  originalData: JSONContent
): {
  array: string[];
  doubleCurly: string[][];
  tags: string[][];
  nesting: string[][];
  indexes: { [key: string]: number[] | number };
} {
  let extraI = 0;
  let arrayCount = 0;
  return Object.entries(originalData).reduce(
    (final, [key, valueArrayOrString], index) => {
      const isArray = valueArrayOrString.constructor === Array;
      const valueArray: string[] = isArray
        ? (valueArrayOrString as string[])
        : [valueArrayOrString as string];
      let i: number;
      const length = valueArray.length;
      for (i = 0; i < length; i += 1) {
        const value = valueArray[i];
        if (typeof value !== "string") {
          console.log(
            chalk.bgRed("JSON object value not a string or string[]:")
          );
          console.log(JSON.stringify(value));
          console.log(chalk.bgRed("___________________________________"));
          throw new Error();
        }
        final.array.push(value);
        final.doubleCurly.push(getInsideDoubleCurly(value));
        final.nesting.push(getInsideNesting(value));
        final.tags.push(getInsideTag(value));
      }
      let curr: number | number[];
      if (!isArray) {
        curr = index + extraI - arrayCount;
      } else {
        curr = Array(valueArray.length)
          .fill(null)
          .map((_, i) => index + i + extraI - arrayCount);
        extraI = extraI + length;
        arrayCount += 1;
      }
      return {
        ...final,
        indexes: {
          ...final.indexes,
          [key]: curr,
        },
      };
    },
    {
      array: [],
      doubleCurly: [],
      tags: [],
      nesting: [],
      indexes: {},
    }
  );
}
