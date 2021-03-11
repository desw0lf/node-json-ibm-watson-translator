import * as fs from "fs";

export function createDir(filePath: string): void {
  const dirPath = filePath.substr(0, filePath.lastIndexOf("/"));
  fs.mkdirSync(dirPath, { recursive: true });
}
