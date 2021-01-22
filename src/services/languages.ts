import * as fetch from "node-fetch";
import { HEADERS, apiError } from "./config";
// import chalk from "chalk";
import { APILanguagesInput, APILanguagesOutput } from "../types";

export function getLanguages(
  { url, apikey }: APILanguagesInput,
  callback: (data: APILanguagesOutput) => void
): void {
  fetch(url + "/v3/languages?version=2018-05-01", {
    method: "get",
    headers: HEADERS(apikey),
  })
    .then((res) => res.json())
    .then((json: APILanguagesOutput) => callback(json))
    .catch(apiError);
}
