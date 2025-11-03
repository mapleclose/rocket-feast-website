export type Language = "en" | "th";
export type Region = "global" | "th";

export interface LocaleConfig {
    region: Region;
    language: Language;
    languageDisplay: string;
    countryCode: string;
    countryName: string;
}

export const LOCALE_CONFIGS: Record<Region, LocaleConfig[]> = {
    global: [
        {
            region: "global",
            language: "en",
            languageDisplay: "English",
            countryCode: "US",
            countryName: "Global",
        },
    ],
    th: [
        {
            region: "th",
            language: "th",
            languageDisplay: "ไทย",
            countryCode: "TH",
            countryName: "ประเทศไทย",
        },
        {
            region: "th",
            language: "en",
            languageDisplay: "English",
            countryCode: "TH",
            countryName: "Thailand",
        },
    ],
};

// Flatten all locale options for easy access
export const ALL_LOCALE_OPTIONS = Object.values(LOCALE_CONFIGS).flat();
