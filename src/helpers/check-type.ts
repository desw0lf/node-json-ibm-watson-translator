export function checkType(x: number | number[] | any) {
  if (x.constructor === Array) {
    return "IS_ARRAY";
  }
  if (typeof x === "object" && x !== null) {
    return "IS_OBJECT";
  }
  return "IS_NUMBER";
}
