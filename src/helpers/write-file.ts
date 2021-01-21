import * as fs from "fs";
import chalk from "chalk";

function createDir(filePath: string): void {
  const dirPath = filePath.substr(0, filePath.lastIndexOf("/"));
  fs.mkdirSync(dirPath, { recursive: true });
}

function createFile(filePath: string, data: any, callback: () => void) {
  fs.writeFile(filePath, data, (err) => {
    if (err) throw err;
    callback();
  });
}

export function writeFile(filePath: string, data: any): void {
  createDir(filePath);
  createFile(filePath, data, function () {
    console.log(chalk.black.bold.bgGreen("Translation Saved! ") + filePath);
  });
}
