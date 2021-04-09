import {
  getInsideDoubleCurly,
  getInsideTag,
  getInsideNesting,
} from "../helpers/replacements";
import { checkType } from "../helpers/check-type";
import chalk from "chalk";
// ? TYPES:
import { JSONContent, Indexes } from "../types";

export function indexOriginalDataMapping(
  originalData: JSONContent
): {
  array: string[];
  doubleCurly: string[][];
  tags: string[][];
  nesting: string[][];
  indexes: Indexes;
} {
  let extraI = 0;
  let arrayCount = 0;
  return Object.entries(originalData).reduce(
    (final, [key, valueArrayOrString], index) => {
      const type = checkType(valueArrayOrString);
      // const isArray = valueArrayOrString.constructor === Array;
      const obj =
        type === "IS_OBJECT" ? Object.entries(valueArrayOrString) : [];
      function va() {
        if (type === "IS_ARRAY") {
          return valueArrayOrString as string[];
        }
        if (type === "IS_NUMBER") {
          return [valueArrayOrString as string];
        }
        return obj.map((item) => item[1]);
      }
      const valueArray: string[] = va();
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
      let curr: number | number[] | { [key: string]: number | number[] };
      if (type === "IS_NUMBER") {
        curr = index + extraI - arrayCount;
      } else if (type === "IS_ARRAY") {
        curr = Array(valueArray.length)
          .fill(null)
          .map((_, i) => index + i + extraI - arrayCount);
        extraI = extraI + length;
        arrayCount += 1;
      } else {
        curr = obj.reduce((final, c, i) => {
          final[c[0]] = index + i + extraI - arrayCount;
          return final;
        }, {});
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
