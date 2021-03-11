export type JSONContent = { [key: string]: string | string[] };
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

//
export type APILanguagesInput = Pick<APITranslateInput, "url" | "apikey">;

export type APILanguagesOutput = {
  languages: {
    language: string;
    language_name: string;
    native_language_name: string;
    country_code: string;
    words_separated: boolean;
    direction: "left_to_right" | "right_to_left";
    supported_as_source: boolean;
    supported_as_target: boolean;
    identifiable: boolean;
  }[];
};

export type ChalkColour =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "blackBright"
  | "redBright"
  | "greenBright"
  | "yellowBright"
  | "blueBright"
  | "magentaBright"
  | "cyanBright"
  | "whiteBright"
  | "gray"
  | "grey";
