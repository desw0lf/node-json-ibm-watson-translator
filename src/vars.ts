import path from "path";

export const LOCALE_FOLDER = process.env.LOCALE_FOLDER || "./locales";
export const OUTPUT_LANGUAGES = process.env.OUTPUT_LANGUAGES
  ? process.env.OUTPUT_LANGUAGES.split(",")
  : ["fr"];
export const CONFIG_PATH = process.env.CONFIG_PATH || "./njiwt.json";
export const TRANSLATION_DELAY = process.env.TRANSLATION_DELAY
  ? parseFloat(process.env.TRANSLATION_DELAY)
  : 5000;
export const FORCED_GLOSSARY_FILES = process.env.FORCED_GLOSSARY_FILES
  ? process.env.FORCED_GLOSSARY_FILES.split(",").map((f) => path.parse(f).name)
  : ["g"];
export const COPY_FILES = process.env.COPY_FILES
  ? process.env.COPY_FILES.split(",")
  : ["index.js", "index.ts"];
