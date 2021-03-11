import { COPY_FILES } from "./vars";
import { generateFileRegex } from "./helpers/regex";
import { generateOutputPath } from "./helpers/generate-output-path";
import { fromDir } from "./helpers/from-dir";
import { copyFile } from "./helpers/copy-file";
import { spinnies } from "./helpers/spinnies";

export function copyOtherFiles(
  inputPath: string,
  inputLanguage: string,
  outputLanguage: string
): void {
  fromDir(inputPath, generateFileRegex(COPY_FILES), function (copyFileName) {
    const outputCopyPath = generateOutputPath(
      copyFileName,
      inputLanguage,
      outputLanguage
    );
    spinnies.add(outputCopyPath, { text: outputCopyPath, colour: "white" });
    copyFile(copyFileName, outputCopyPath, "[OK //FILE COPIED]", "blue");
  });
}
