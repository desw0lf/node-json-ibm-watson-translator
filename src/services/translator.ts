import * as fetch from "node-fetch";
import chalk from "chalk";
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
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + Buffer.from("apikey:" + apikey).toString("base64"),
    },
  })
    .then((res) => res.json())
    .then((json: APITranslateOutput) => callback(json))
    .catch((error) => {
      console.log(chalk.bgRed("== Translate API ERROR =="));
      console.log(error);
    });
}
