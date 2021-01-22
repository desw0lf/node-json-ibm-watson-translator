export const LOCALE_FOLDER = process.env.LOCALE_FOLDER || "./locales";
export const OUTPUT_LANGUAGES = process.env.OUTPUT_LANGUAGE
  ? process.env.OUTPUT_LANGUAGE.split(",")
  : ["fr"];
export const CONFIG_PATH = process.env.CONFIG_PATH || "./njiwt.json";
