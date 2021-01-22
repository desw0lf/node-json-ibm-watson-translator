import { getInsideDoubleCurly, getInsideTag } from "../helpers/replacements";
// ? TYPES:
import { JSONContent } from "../types";

export function indexOriginalDataMapping(
  originalData: JSONContent
): {
  array: string[];
  doubleCurly: string[][];
  tags: string[][];
  indexes: { [key: string]: number };
} {
  return Object.entries(originalData).reduce(
    (final, [key, value], index) => {
      final.array.push(value);
      final.doubleCurly.push(getInsideDoubleCurly(value));
      final.tags.push(getInsideTag(value));
      return {
        ...final,
        indexes: {
          ...final.indexes,
          [key]: index,
        },
      };
    },
    {
      array: [],
      doubleCurly: [],
      tags: [],
      indexes: {},
    }
  );
}
