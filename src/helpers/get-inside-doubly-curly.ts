export const getInsideDoubleCurly = (str: string): string[] =>
  str
    .split("{{")
    .filter((val) => val.includes("}}"))
    .map((val) => val.substring(0, val.indexOf("}}")));
