import type { I18nConfig } from "@/types/i18n";

/**
 * Thailand English configuration (th-en)
 * Only override what's different from global-en
 * Everything else will fall back to global-en
 */
export const thEnConfig: Partial<I18nConfig> = {
    regional: {
        company: {
            name: "Rocket Feast",
            legalName: "Yummi Umami Ltd",
            country: "Thailand",
        },
        currency: {
            code: "THB",
            symbol: "฿",
            locale: "th-TH",
        },
        pricing: {
            starter: 0,
            professional: 300,
            enterprise: 1000,
        },
    },
    // Content stays the same as global-en (English language)
    // No need to override unless you want region-specific messaging
};
