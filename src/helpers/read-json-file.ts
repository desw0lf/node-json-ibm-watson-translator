import * as fs from "fs";
import { spinnies } from "./spinnies";
// ? TYPES:
import { JSONContent } from "../types";

export function readJsonFile(
  filename: string,
  callback: (data: JSONContent) => void
): void {
  fs.readFile(filename, (err, data) => {
    if (err) {
      spinnies.stopAll("fail");
      throw err;
    }
    callback(JSON.parse((data as unknown) as string));
  });
}
