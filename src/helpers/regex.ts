function escapeRegex(str: string): string {
  // | not included
  return str.replace(/[-\/\\^$*+?.()[\]{}]/g, "\\$&");
}

export function generateFileRegex(arr: string[]): RegExp {
  return new RegExp(escapeRegex(arr.join("|")) + "$");
}
