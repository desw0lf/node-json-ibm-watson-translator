export type JSONContent = { [key: string]: string };
export type Config = {
  url: string;
  apikey: string;
  inputLanguage: string | "en";
};

export type APITranslateInput = {
  url: string;
  inputLanguage: "en" | string;
  outputLanguage: string;
  apikey: string;
  translations: string[];
};

export type APITranslateOutput = {
  translations: {
    translation: string;
  }[];
  word_count: number;
  character_count: number;
};
