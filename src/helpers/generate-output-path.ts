export function generateOutputPath(
  filename: string,
  inputLanguage: string,
  outputLanguage: string
): string {
  return filename.replace(`/${inputLanguage}/`, `/${outputLanguage}/`);
}
