import * as fs from "fs";

// ? TYPES:
import { Config } from "./types";

export function loadConfig(configPath: string): Config {
  if (!fs.existsSync(configPath)) {
    console.warn("no config exists ", configPath);
    return { url: "", apikey: "", inputLanguage: "en" };
  }
  const rawdata = fs.readFileSync(configPath);
  return JSON.parse(rawdata as unknown as string) as Config;
}
