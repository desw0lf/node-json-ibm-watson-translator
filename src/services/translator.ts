import * as fetch from "node-fetch";
import { HEADERS, apiError } from "./config";
// import chalk from "chalk";
import { APITranslateInput, APITranslateOutput } from "../types";

export function postTranslate(
  {
    url,
    inputLanguage,
    outputLanguage,
    apikey,
    translations,
  }: APITranslateInput,
  callback: (data: APITranslateOutput) => void
): void {
  const body = {
    text: translations,
    model_id: inputLanguage + "-" + outputLanguage,
  };

  fetch(url + "/v3/translate?version=2018-05-01", {
    method: "post",
    body: JSON.stringify(body),
    headers: HEADERS(apikey),
  })
    .then((res) => res.json())
    .then((json: APITranslateOutput) => callback(json))
    .catch((error) => apiError(error, "== Translate API ERROR =="));
}
