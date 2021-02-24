function findReplaceDoubleCurly(
  str: string,
  replace: string[],
  find = ".*?"
): string {
  let index = 0;
  // if (/[a-zA-Z\_]+/g.test(str)) {
  return str.replace(
    new RegExp("{{(?:\\s+)?(" + find + ")(?:\\s+)?}}", "g"),
    function () {
      return replace[index++];
    }
  );
  // } else {
  //   throw new Error(
  //     "Find statement does not match regular expression: /[a-zA-Z_]+/"
  //   );
  // }
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
  const trim = str.replace(/\{\s/g, "{").replace(/\s\}/g, "}");
  const y = findReplaceDoubleCurly(trim, replacementsWithDoublyCurly);
  return y;
}

//

export const getInsideTag = (str: string): string[] =>
  str
    .split("<")
    .filter((val) => val.includes(">"))
    .map((val) => val.substring(0, val.indexOf(">")))
    .filter((val) => !val.startsWith("/"));

export function tagReplacement(str: string, replacements: string[]): string {
  if (replacements.length === 0) {
    return str;
  }
  // const tags = replacements.map((r) => {
  //   const index = r.indexOf(" ");
  //   if (index === -1) {
  //     return r;
  //   }
  //   return r.substr(0, index);
  // });
  // console.log(replacements);
  // console.log(tags);
  // const replacementsWithAngleBrackets = replacements.map((r) => "<" + r + ">");
  const trim = str
    .replace(/\s\<(\/\S+)\>/g, "<$1>")
    .replace(/\<([a-z0-9\s]+)\>\s/gi, "<$1>");
  // console.log(replacementsWithAngleBrackets);
  // const y = findReplaceDoubleCurly(z, replacementsWithDoublyCurly);
  return trim;
}
