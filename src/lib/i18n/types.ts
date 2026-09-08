export type Lang = "en" | "bn";

export const langs: Lang[] = ["en", "bn"];

export function isLang(v: string): v is Lang {
  return v === "en" || v === "bn";
}
