function findReplaceDoubleCurly(
  str: string,
  replace: string[],
  find = ".*?"
): string {
  let index = 0;
  if (/[a-zA-Z\_]+/g.test(str)) {
    return str.replace(
      new RegExp("{{(?:\\s+)?(" + find + ")(?:\\s+)?}}", "g"),
      function () {
        return replace[index++];
      }
    );
  } else {
    throw new Error(
      "Find statement does not match regular expression: /[a-zA-Z_]+/"
    );
  }
}

export const getInsideDoubleCurly = (str: string): string[] =>
  str
    .split("{{")
    .filter((val) => val.includes("}}"))
    .map((val) => val.substring(0, val.indexOf("}}")));

// g.substring(1,g.length-1).replace("{", "").replace("}", "").trim();

export function doubleCurlyReplacement(
  str: string,
  replacements: string[]
): string {
  if (replacements.length === 0) {
    return str;
  }
  const replacementsWithDoublyCurly = replacements.map((r) => "{{" + r + "}}");
  const z = str.replace(/\{\s/g, "{").replace(/\s\}/g, "}");
  const y = findReplaceDoubleCurly(z, replacementsWithDoublyCurly);
  return y;
}
