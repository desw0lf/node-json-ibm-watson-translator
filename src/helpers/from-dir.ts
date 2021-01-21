import * as path from "path";
import * as fs from "fs";

export function fromDir(
  startPath: string,
  filter: RegExp,
  callback: (filename: string) => void
): void {
  if (!fs.existsSync(startPath)) {
    console.warn("no directory ", startPath);
    return;
  }
  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter, callback); //recurse
    } else if (filter.test(filename)) callback(filename);
  }
}
