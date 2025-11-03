import type { Language, Region } from "./locale";

/**
 * Company configuration per region
 */
export interface CompanyConfig {
    name: string;
    legalName: string;
    country: string;
}

/**
 * Currency configuration
 */
export interface CurrencyConfig {
    code: string; // ISO 4217 currency code (USD, THB)
    symbol: string; // $, ฿
    locale: string; // For number formatting (en-US, th-TH)
}

/**
 * Pricing configuration per region
 */
export interface PricingConfig {
    starter: number;
    professional: number;
    enterprise: number;
}

/**
 * Regional configuration (region-specific, language-agnostic)
 * These values are the same regardless of language
 */
export interface RegionalConfig {
    company: CompanyConfig;
    currency: CurrencyConfig;
    pricing: PricingConfig;
}

/**
 * Content that can be translated
 * This is where all your translatable strings go
 */
export interface ContentConfig {
    // Common
    common: {
        learnMore: string;
        getStarted: string;
        contactUs: string;
        signUp: string;
        signIn: string;
        readMore: string;
        comingSoon: string;
    };

    // Navigation
    nav: {
        home: string;
        features: string;
        pricing: string;
        about: string;
        contact: string;
        blog: string;
    };

    // Hero section
    hero: {
        title: string;
        subtitle: string;
        cta: string;
        secondaryCta: string;
    };

    // Features
    features: {
        title: string;
        subtitle: string;
        // Individual features can be added here or managed separately
    };

    // Pricing
    pricing: {
        title: string;
        subtitle: string;
        perMonth: string;
        perYear: string;
        billedMonthly: string;
        billedAnnually: string;
        startTrial: string;
        choosePlan: string;
    };

    // Footer
    footer: {
        company: string;
        product: string;
        resources: string;
        legal: string;
        allRightsReserved: string;
    };
}

/**
 * Complete i18n configuration combining regional and content
 */
export interface I18nConfig {
    regional: RegionalConfig;
    content?: ContentConfig; // Optional - only needed if using translations
}

/**
 * Locale key type for type safety
 */
export type LocaleKey = `${Region}-${Language}`;

/**
 * Helper type for nested object paths (for type-safe translations)
 */
export type NestedKeyOf<T> = T extends object
    ? {
          [K in keyof T]: K extends string ? `${K}` | `${K}.${NestedKeyOf<T[K]>}` : never;
      }[keyof T]
    : never;

/**
 * Type-safe translation key
 */
export type TranslationKey = NestedKeyOf<ContentConfig>;
