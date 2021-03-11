import * as fs from "fs";
import { spinnies } from "./spinnies";
import { createDir } from "./create-dir";

export function copyFile(
  sourcePath: string,
  filePath: string,
  successMessage = "[OK COPIED]"
): void {
  createDir(filePath);
  fs.copyFile(sourcePath, filePath, (err) => {
    if (err) {
      spinnies.fail(filePath);
      throw err;
    }
    spinnies.succeed(filePath, { text: filePath + " " + successMessage });
  });
}
