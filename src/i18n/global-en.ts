import type { I18nConfig } from "@/types/i18n";

/**
 * Base configuration for Global English (global-en)
 * This is the default fallback for all content
 */
export const globalEnConfig: I18nConfig = {
    regional: {
        company: {
            name: "Rocket Feast",
            legalName: "Maple Close Ltd",
            country: "Hong Kong",
        },
        currency: {
            code: "USD",
            symbol: "$",
            locale: "en-US",
        },
        pricing: {
            starter: 0,
            professional: 10,
            enterprise: 30,
        },
    },
    // Note: content section omitted - not needed since all content is in components
    // Add it back when you need multi-language translation support
};
