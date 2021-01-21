import * as fs from "fs";
// ? TYPES:
import { JSONContent } from "../types";

export function readJsonFile(
  filename: string,
  callback: (data: JSONContent) => void
): void {
  fs.readFile(filename, (err, data) => {
    if (err) throw err;
    callback(JSON.parse((data as unknown) as string));
  });
}
