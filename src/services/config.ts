import chalk from "chalk";

export const HEADERS = (apikey: string) => ({
  "Content-Type": "application/json",
  Authorization: "Basic " + Buffer.from("apikey:" + apikey).toString("base64"),
});

export const apiError = (error: any, message = "== API ERROR =="): void => {
  console.log(chalk.bgRed(message));
  console.log(error);
};
