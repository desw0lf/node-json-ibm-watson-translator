import * as fs from "fs";
// import chalk from "chalk";
import { spinnies } from "./spinnies";
import { createDir } from "./create-dir";

function createFile(filePath: string, data: any, callback: () => void) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      spinnies.fail(filePath);
      throw err;
    }
    callback();
  });
}

export function writeFile(
  filePath: string,
  data: any,
  successMessage = "[OK]"
): void {
  createDir(filePath);
  createFile(filePath, data, function () {
    spinnies.succeed(filePath, { text: filePath + " " + successMessage });
    // console.log(chalk.bold.green(successMessage) + " " + filePath);
  });
}
