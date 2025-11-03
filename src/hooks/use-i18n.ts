import { useMemo, useCallback } from "react";
import { useLocale } from "@/providers/locale-provider";
import { getLocaleConfig, getNestedValue } from "@/i18n";
import type { I18nConfig, TranslationKey } from "@/types/i18n";

/**
 * Hook to access i18n configuration and translations
 * Automatically uses the current locale from LocaleProvider
 */
export function useI18n() {
    const { locale } = useLocale();

    // Memoize the config so it only recalculates when locale changes
    const config = useMemo(() => {
        return getLocaleConfig(locale.region, locale.language);
    }, [locale.region, locale.language]);

    /**
     * Get a translated string or value using dot notation
     * Example: t("common.learnMore") -> "Learn more"
     * Example: t("howItWorks.features") -> ["Feature 1", "Feature 2"]
     */
    const t = useCallback(
        (key: TranslationKey): any => {
            if (!config.content) {
                console.warn(`Translation requested but content not configured. Key: ${key}`);
                return key;
            }
            const value = getNestedValue(config.content, key);
            if (value !== undefined && value !== null) {
                return value;
            }
            // Fallback to key if translation not found (useful during development)
            console.warn(`Translation missing for key: ${key}`);
            return key;
        },
        [config.content],
    );

    /**
     * Format currency value according to regional settings
     */
    const formatCurrency = useCallback(
        (amount: number): string => {
            return new Intl.NumberFormat(config.regional.currency.locale, {
                style: "currency",
                currency: config.regional.currency.code,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }).format(amount);
        },
        [config.regional.currency.locale, config.regional.currency.code],
    );

    /**
     * Format number according to regional settings
     */
    const formatNumber = useCallback(
        (value: number, options?: Intl.NumberFormatOptions): string => {
            return new Intl.NumberFormat(config.regional.currency.locale, options).format(value);
        },
        [config.regional.currency.locale],
    );

    // Memoize regional separately to ensure stable reference
    const regional = useMemo(() => config.regional, [config]);

    return {
        /** Current i18n configuration */
        config,
        /** Translation function */
        t,
        /** Regional settings (company, currency) */
        regional,
        /** Format currency amount */
        formatCurrency,
        /** Format number */
        formatNumber,
        /** Current locale info */
        locale,
    };
}

/**
 * Type-safe hook that returns just the config
 * Useful when you only need to access config without translations
 */
export function useI18nConfig(): I18nConfig {
    const { config } = useI18n();
    return config;
}

/**
 * Hook for regional-specific data only
 * Useful for components that only need company/currency info
 */
export function useRegional() {
    const { regional, formatCurrency, formatNumber } = useI18n();
    return { regional, formatCurrency, formatNumber };
}
