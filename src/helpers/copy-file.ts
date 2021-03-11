import * as fs from "fs";
import { spinnies } from "./spinnies";
import { createDir } from "./create-dir";

import { ChalkColour } from "../types";

export function copyFile(
  sourcePath: string,
  filePath: string,
  successMessage = "[OK COPIED]",
  succeedColor: ChalkColour = "green"
): void {
  createDir(filePath);
  fs.copyFile(sourcePath, filePath, (err) => {
    if (err) {
      spinnies.fail(filePath);
      throw err;
    }
    spinnies.succeed(filePath, {
      text: filePath + " " + successMessage,
      succeedColor: succeedColor,
    });
  });
}
